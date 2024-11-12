'use client'
import { UploadButton } from '@/utils/uploadthing'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'

interface UploadResponse {
  url: string
  name: string
  key: string
}

export default function UploadImage(props: {
  setImageUrl: (url: string) => void
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)
  const [showImage, setShowImage] = useState<boolean>(false)
  const [showChangeButton, setShowChangeButton] = useState<boolean>(false)

  const handleImageLoad = () => {
    setImageLoading(false)
    setShowImage(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const deleteImage = async (fileUrl: string) => {
    try {
      const response = await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileUrl }),
      })

      if (!response.ok) {
        setImageError(true)
        const errorData = await response.json()
        console.error(
          'Failed to delete image:',
          errorData.error || 'Unknown error'
        )
        throw new Error(errorData.error || 'Failed to delete image')
      }

      console.log('Image deleted successfully')
      setShowChangeButton(false)
      setShowImage(false)
      setImageLoading(true)
      setImageUrl(null)
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }
  useEffect(() => {
    if (imageUrl) {
      props.setImageUrl(imageUrl)
    }
  }, [imageUrl])

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="h3 font-bold">Image</h3>

      {imageError && (
        <p className="text-error-default ml-2">
          Error: image cannot be loaded.
        </p>
      )}

      {showImage ? (
        <div className="relative w-full h-[400px]">
          {imageLoading ? (
            <div className="flex flex-col space-y-4 justify-center items-center border-4 border-gray-100 rounded-xl w-full h-[400px]">
              <p>Loading...</p>
            </div>
          ) : (
            <Image
              alt="Uploaded Image"
              src={imageUrl || ''}
              layout="fill"
              objectFit="cover"
              className={`rounded-xl transition duration-500 ease-out ${imageLoading ? 'blur-md' : 'blur-0'}`}
              onError={handleImageError}
              onLoadingComplete={handleImageLoad}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 justify-center items-center border-4 border-gray-100 rounded-xl w-full h-[400px]">
          <div className="flex space-x-8">
            <FontAwesomeIcon
              icon={faImage}
              className="text-gray-100 h-[80px]"
            />
            <FontAwesomeIcon icon={faPlus} className="text-gray-100 h-[80px]" />
          </div>
          <UploadButton
            className="mt-2 ut-button:bg-primary-200 ut-button:text-black
                ut-button:ut-ready:bg-primary-300 ut-button:ut-ready:hover:bg-primary-400
                ut-button:ut-uploading:bg-primary-300"
            endpoint="imageUploader"
            onClientUploadComplete={(res: UploadResponse[]) => {
              // Update the image URL state when the upload completes
              console.log('Files: ', res)
              setImageUrl(res[0].url)
              setShowImage(true)
              setImageLoading(false)
              setShowChangeButton(true)
              //alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              setImageError(true)
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
      )}

      {showChangeButton && (
        <Button variant="outline" onClick={() => deleteImage(imageUrl || '')}>
          Change Image
        </Button>
      )}
    </div>
  )
}
