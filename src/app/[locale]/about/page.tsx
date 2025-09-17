import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <MainLayout>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* Company Story */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('story.title')}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t('story.paragraph1')}
                </p>
                <p className="text-gray-600">
                  {t('story.paragraph2')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">2025</div>
                <div className="text-gray-600 mb-4">Founded</div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
                <div className="text-gray-600 mb-4">Happy Customers</div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">50k+</div>
                <div className="text-gray-600">Orders Completed</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('values.quality.title')}
                </h3>
                <p className="text-gray-600">
                  {t('values.quality.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('values.speed.title')}
                </h3>
                <p className="text-gray-600">
                  {t('values.speed.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('values.service.title')}
                </h3>
                <p className="text-gray-600">
                  {t('values.service.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('cta.contact')}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                {t('cta.products')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
