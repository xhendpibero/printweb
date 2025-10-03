import type { FileRequirement } from '../types'

const FILE_REQUIREMENTS: FileRequirement[] = [
  {
    title: 'Print-ready files',
    description: 'Files should be print-ready with proper bleed (3mm minimum)'
  },
  {
    title: 'Color mode',
    description: 'Use CMYK color mode for best results'
  },
  {
    title: 'Resolution',
    description: 'Minimum resolution: 300 DPI'
  },
  {
    title: 'Text handling',
    description: 'Text should be outlined or fonts embedded'
  },
  {
    title: 'File size',
    description: 'Maximum file size: 50MB per file'
  }
]

export function FileRequirements() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-medium text-blue-900 mb-3">File Requirements</h3>
      <ul className="text-sm text-blue-800 space-y-2">
        {FILE_REQUIREMENTS.map((requirement, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <span className="font-medium">{requirement.title}:</span>{' '}
              <span>{requirement.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
