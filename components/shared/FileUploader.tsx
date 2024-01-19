import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { PutBlobResult } from '@vercel/blob'
import { convertFileToUrl } from '@/lib/utils'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { StringExpressionOperator } from 'mongoose'

type FileUploaderProps = {
  onFieldChange: (value: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}
const FileUploader = ({
  onFieldChange,
  imageUrl,
  setFiles,
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles)
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    },
  })

  return (
    <>
      <div
        {...getRootProps()}
        className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50"
      >
        <input
          {...getInputProps()}
          className="cursor-pointer"
        />
        {imageUrl ? (
          <>
            <div className="flex h-full w-full flex-1 justify-center">
              <img
                src={imageUrl}
                alt="image"
                className="w-full object-cover object-center"
              />
            </div>
          </>
        ) : (
          <div className="flex-center flex-col py-5 text-grey-500">
            <img
              src="/assets/icons/upload.svg"
              width={77}
              height={77}
              alt="file upload"
            />
            <h3 className="mb-2 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            <Button type="button">Select from computer</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default FileUploader
