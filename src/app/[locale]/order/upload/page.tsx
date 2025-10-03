'use client'

import { useState } from 'react'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { Upload, FileText, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'

export default function OrderUploadPage() {
  const params = useParams()
  const locale = params.locale as string
  const items = useCartStore((s) => s.items)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({})

  const handleFileUpload = (itemId: string, files: FileList) => {
    setUploadedFiles(prev => ({
      ...prev,
      [itemId]: Array.from(files)
    }))
  }

  const allFilesUploaded = items.every(item => 
    uploadedFiles[item.itemId] && uploadedFiles[item.itemId].length > 0
  )

  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="upload" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Files</h1>
          <p className="text-gray-600">
            Upload the print-ready files for each product in your order. We accept PDF, AI, EPS, and high-resolution images.
          </p>
        </div>

        {/* File Upload for Each Cart Item */}
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.itemId} className="bg-white border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                  {item.thumbnail && (
                    <img 
                      src={item.thumbnail} 
                      alt={item.slug}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {item.slug.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity} • {item.configuration.format}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.configuration.paper} • {item.configuration.colors}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {uploadedFiles[item.itemId]?.length > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {uploadedFiles[item.itemId].length} file(s) uploaded
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-orange-600 font-medium">Files required</span>
                  )}
                </div>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.ai,.eps,.jpg,.jpeg,.png,.tiff"
                  onChange={(e) => e.target.files && handleFileUpload(item.itemId, e.target.files)}
                  className="hidden"
                  id={`file-upload-${item.itemId}`}
                />
                <label htmlFor={`file-upload-${item.itemId}`} className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Click to upload files or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, AI, EPS, JPG, PNG, TIFF up to 100MB each
                  </p>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles[item.itemId]?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles[item.itemId].map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button 
                        onClick={() => {
                          setUploadedFiles(prev => ({
                            ...prev,
                            [item.itemId]: prev[item.itemId].filter((_, i) => i !== index)
                          }))
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* File Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-medium text-blue-900 mb-2">File Requirements</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Files should be print-ready with proper bleed (3mm minimum)</li>
            <li>• Use CMYK color mode for best results</li>
            <li>• Minimum resolution: 300 DPI</li>
            <li>• Text should be outlined or fonts embedded</li>
            <li>• Maximum file size: 100MB per file</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}/order/cart`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="flex gap-3">
            <Link
              href={`/${locale}/order/summary`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Skip for Now
            </Link>
            <Link
              href={`/${locale}/order/shipment`}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium ${
                allFilesUploaded
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (!allFilesUploaded) {
                  e.preventDefault()
                }
              }}
            >
              Continue to Shipment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  )
}
