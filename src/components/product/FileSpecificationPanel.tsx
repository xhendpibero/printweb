import { Download, FileText } from 'lucide-react';

interface SpecificationDetail {
  label: string;
  value: string;
  description?: string;
}

interface FileSpecificationPanelProps {
  title?: string;
  instructions?: string;
  keyDetails?: SpecificationDetail[];
  downloadUrl?: string;
  mockupUrl?: string;
}

const defaultKeyDetails: SpecificationDetail[] = [
  { label: 'Resolution', value: '300 dpi', description: 'Minimum required resolution' },
  { label: 'Colors', value: 'color - both sides (4/4) CMYK', description: 'Full color printing' },
  { label: 'Gross format', value: '77 × 108 mm', description: 'Format with bleed added' },
  { label: 'Net format', value: '74 × 105 mm', description: 'The design\'s final size' },
  { label: 'Bleed', value: '1.5 mm', description: 'Required bleed area' }
];

export function FileSpecificationPanel({ 
  title = 'Specification of files (to print)',
  instructions = 'Choose the appropriate file variant, prepare your project according to the specifications',
  keyDetails = defaultKeyDetails,
  downloadUrl,
  mockupUrl
}: FileSpecificationPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {instructions}
        </p>
      </div>

      {/* Download Links */}
      <div className="flex space-x-4">
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="inline-flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download sample mockups</span>
          </a>
        )}
        {mockupUrl && (
          <a
            href={mockupUrl}
            className="inline-flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Download specifications</span>
          </a>
        )}
      </div>

      {/* File Format */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">pdf</span>
        </div>
        <p className="text-sm text-gray-600">
          Recommended file format for print-ready files
        </p>
      </div>

      {/* Key Details */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Key details:</h4>
        <div className="space-y-3">
          {keyDetails.map((detail) => (
            <div key={detail.label} className="flex justify-between items-start">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-700">
                  {detail.label}
                </dt>
                {detail.description && (
                  <dd className="text-xs text-gray-500 mt-1">
                    {detail.description}
                  </dd>
                )}
              </div>
              <dd className="text-sm text-gray-900 font-medium ml-4">
                {detail.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
