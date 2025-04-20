import { api } from '@/trpc/react'
import React from 'react'
import {useLocalStorage} from 'usehooks-ts'
import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '@/server/api/root' // adjust if needed

type RouterOutput = inferRouterOutputs<AppRouter>
export type Project = RouterOutput['project']['getProjects'][number]
const useProject = () => {
    const {data: projects}=api.project.getProjects.useQuery()
    const [projectId,setProjectId]=useLocalStorage('dionysus-projectId',' ')
    const project = projects?.find((project: any) => project.id === projectId)
    return{
        projects,
        project,
        projectId,
        setProjectId

    }
}

export default useProject
