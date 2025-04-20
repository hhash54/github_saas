'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
type FormInput={
    repoUrl: string
    projectName: string
    githubToken?:string
}
function page() {
  return (
    <div>
      
    </div>
  )
}

const CreatePage=()=>{
    const {register, handleSubmit,reset}=useForm<FormInput>()
    function onSubmit(data: FormInput){
        window.alert(JSON.stringify(data, null, 2))
        return true
    }
    return (
        <div className='flex items-center gap-12 h-full justify-center'>
            <img src='/photo2.svg' className='h-56 w-auto'/>
            <div>
                <div>
                    <h1 className='font-semibold text-2x1'>
                        Link your GitHub repo 

                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Enter the URL of you repository to link it to Dupli
                    </p>
                </div>
                <div className='h-4'></div>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <Input
                            {... register('projectName',{required:true})}
                            placeholder='Project Name'
                            required
                        />
                        <Input
                            {... register('repoUrl',{required:true})}
                            placeholder='GitHub URL'
                            type='url'
                            required
                        />
                        <Input
                            {... register('githubToken')}
                            placeholder='Github Token (Optional)'
                        />
                        <div className='h-4'></div>
                        <Button type='submit'>
                            Create Project
                        </Button>
  

                    </form>
                </div>
            </div>

        </div>
    )
}
export default CreatePage
