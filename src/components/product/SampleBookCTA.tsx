import Link from 'next/link';

interface SampleBookCTAProps {
  type: 'paper' | 'finishings';
  title: string;
  description: string;
  ctaText?: string;
  learnMoreText?: string;
  learnMoreUrl?: string;
  onAddToCart?: () => void;
}

export function SampleBookCTA({ 
  type, 
  title, 
  description, 
  ctaText = 'Add to cart',
  learnMoreText = 'Learn more',
  learnMoreUrl = '#',
  onAddToCart 
}: SampleBookCTAProps) {
  const bgColor = type === 'paper' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200';
  const textColor = type === 'paper' ? 'text-blue-800' : 'text-purple-800';
  const buttonColor = type === 'paper' 
    ? 'bg-blue-600 hover:bg-blue-700' 
    : 'bg-purple-600 hover:bg-purple-700';
  const linkColor = type === 'paper' 
    ? 'text-blue-600 hover:text-blue-700' 
    : 'text-purple-600 hover:text-purple-700';

  return (
    <div className={`${bgColor} border rounded-lg p-4 mb-6`}>
      <h3 className={`text-sm font-medium ${textColor} mb-1`}>
        {title}
      </h3>
      <p className={`text-sm ${textColor} mb-3`}>
        {description}
      </p>
      <div className="flex space-x-3">
        <button 
          onClick={onAddToCart}
          className={`${buttonColor} text-white px-4 py-2 rounded text-sm font-medium transition-colors`}
        >
          {ctaText}
        </button>
        <Link 
          href={learnMoreUrl}
          className={`${linkColor} text-sm underline hover:no-underline transition-colors`}
        >
          {learnMoreText}
        </Link>
      </div>
    </div>
  );
}
