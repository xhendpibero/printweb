import { Download, FileText } from 'lucide-react';

interface PDFPreviewPanelProps {
  pdfUrl?: string;
  title?: string;
  downloadable?: boolean;
}

export function PDFPreviewPanel({ 
  pdfUrl, 
  title = 'Print specification preview',
  downloadable = true 
}: PDFPreviewPanelProps) {
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'specification.pdf';
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Preview
      </h3>
      
      {/* PDF Preview Area */}
      <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 h-96 flex flex-col">
        {pdfUrl ? (
          <>
            <iframe
              src={pdfUrl}
              className="flex-1 border-0 rounded-t-lg"
              title={title}
            />
            {downloadable && (
              <div className="p-3 bg-white border-t rounded-b-lg">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <FileText className="w-12 h-12 mb-3" />
            <p className="text-sm font-medium">PDF Preview</p>
            <p className="text-xs text-gray-400 mt-1">
              Specification document will appear here
            </p>
            {downloadable && (
              <button
                onClick={handleDownload}
                disabled={!pdfUrl}
                className="mt-4 inline-flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
