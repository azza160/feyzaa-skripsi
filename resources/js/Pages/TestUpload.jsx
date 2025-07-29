"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"

export default function TestUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const { data, setData, post, processing, errors } = useForm({
    name: "Test User",
    avatar: null,
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      })
      
      setSelectedFile(file)
      setData("avatar", file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form with data:', data)
    
    post("/test-upload", {
      forceFormData: true,
      onSuccess: (page) => {
        console.log('Upload successful')
        alert('Upload successful!')
      },
      onError: (errors) => {
        console.log('Upload failed:', errors)
        alert('Upload failed: ' + JSON.stringify(errors))
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Test File Upload</h1>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Avatar:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? "Uploading..." : "Upload"}
          </button>
        </form>
        
        {errors.avatar && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            {errors.avatar}
          </div>
        )}
      </div>
    </div>
  )
} 