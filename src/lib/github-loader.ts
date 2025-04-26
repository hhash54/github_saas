import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github';
import { Document } from '@langchain/core/documents';
import { aiSummariseCommit, summariseCode, generateEmbedding } from "./gemini";
import { sleep } from '@trpc/server/unstable-core-do-not-import';
import { db } from "@/server/db";      // <— import your Prisma client



  // <— import your Prisma client

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || process.env.GITHUB_TOKEN || "",
    branch: "main",
    ignoreFiles: ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb"],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  return await loader.load();
};
export const indexGithubRepo = async (
    projectId: string,
    githubUrl: string,
    githubToken?: string
  ) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);
    const allEmbeddings = await generateEmbeddings(docs);
  
    // throttle your DB writes so you don’t exhaust the pool
    for (let i = 0; i < allEmbeddings.length; i++) {
      const embedding = allEmbeddings[i];
      console.log(`processing ${i + 1} of ${allEmbeddings.length}`);
      if (!embedding) continue;
  
      // 1) insert the record
      const record = await db.sourceCodeEmbedding.create({
        data: {
          summary: embedding.summary,
          sourceCode: embedding.sourceCode,
          fileName: embedding.fileName,
          projectId,
        },
      });
  
      // 2) then back-fill the vector embedding
      await db.$executeRaw`
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${record.id}
      `;
    }
  };
  
  
  const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(
      docs.map(async doc => {
        const summary = await summariseCode(doc);
        const embedding = await generateEmbedding(summary);
        return {
          summary,
          embedding,
          sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
          fileName: doc.metadata.source,
        };
      })
    );
  };

