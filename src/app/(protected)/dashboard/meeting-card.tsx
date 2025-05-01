'use client'

import { Card } from '@/components/ui/card'
import { useDropzone } from 'react-dropzone'
import React from 'react'
import { uploadFile } from '@/lib/firebase'


const MeetingCard = () => {
    const [isUploading, setIsUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        'audio/*': ['.mp3', '.wav', '.m4a'],
      },
      multiple: false,
      maxSize: 50_000_000,
      onDrop: async acceptedFiles => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0]
        const downloadURL = await uploadFile(file as File, setProgress)
      }
      
    })
  
    return (
      <Card className='col-span-2 flex flex-col items-center justify-center'>
      </Card>
    )
  }
  
  export default MeetingCard
  