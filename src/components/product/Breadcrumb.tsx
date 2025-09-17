import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-indigo-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={item.current ? 'text-gray-900 font-medium' : ''}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-gray-400">&gt;</span>
          )}
        </div>
      ))}
    </nav>
  );
}
