'use server'

import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateEmbedding } from '@/lib/gemini'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue()

  const queryVector = await generateEmbedding(question)
  const vectorQuery = `[${queryVector.join(',')}]`
}
