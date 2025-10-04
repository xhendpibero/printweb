'use client'

import type { ConfiguratorProps } from '../types'
import { FormatSelector } from '@/components/product/FormatSelector'
import { PaperSelector } from '@/components/product/PaperSelector'
import { ColorSelector } from '@/components/product/ColorSelector'
import { SurfaceFinishingSelector } from '@/components/product/SurfaceFinishingSelector'
import { ProjectPreparationSelector } from '@/components/product/ProjectPreparationSelector'

export function ProductConfigurator({
  onConfigurationChange
}: ConfiguratorProps) {
  return (
    <div className="space-y-8">
      {/* Format Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Format</h3>
        <FormatSelector 
          onSelect={(formatId) => {
            onConfigurationChange({ format: formatId })
          }}
        />
      </div>

      {/* Paper Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Paper</h3>
        <PaperSelector 
          onSelect={(paperId, weight) => {
            onConfigurationChange({ paper: `${paperId} ${weight}` })
          }}
        />
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Colors</h3>
        <ColorSelector 
          onSelect={(colorId) => {
            onConfigurationChange({ colors: colorId })
          }}
        />
      </div>

      {/* Surface Finishing */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Surface Finishing</h3>
        <SurfaceFinishingSelector 
          title="Select Finishings"
          options={[
            {
              id: 'uv-spot',
              name: 'UV Spot Gloss',
              description: 'High-gloss UV coating on selected areas',
              sides: ['front', 'both']
            },
            {
              id: 'lamination',
              name: 'Lamination',
              description: 'Protective plastic coating',
              sides: ['front', 'both']
            }
          ]}
          onSelect={(finishingId) => {
            // Convert single string to array for configuration
            onConfigurationChange({ finishings: [finishingId] })
          }}
        />
      </div>

      {/* Project Preparation */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Preparation</h3>
        <ProjectPreparationSelector 
          onSelect={(preparation) => {
            onConfigurationChange({ projectPreparation: preparation })
          }}
        />
      </div>
    </div>
  )
}
