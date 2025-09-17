import { useTranslations } from 'next-intl';
import { LegalLayout } from '@/components/layout';

export default function CookiePolicyPage() {
  const t = useTranslations('legal.cookies');

  return (
    <LegalLayout>
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('title')}
        </h1>
        
        <div className="text-sm text-gray-500 mb-8">
          {t('lastUpdated')}: {t('date')}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('introduction.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('introduction.paragraph1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('introduction.paragraph2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('whatAreCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('whatAreCookies.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('typesOfCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('typesOfCookies.description')}
            </p>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t('typesOfCookies.essential.title')}
                </h3>
                <p className="text-green-700 mb-2">
                  {t('typesOfCookies.essential.description')}
                </p>
                <p className="text-sm text-green-600">
                  {t('typesOfCookies.essential.note')}
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {t('typesOfCookies.functional.title')}
                </h3>
                <p className="text-blue-700 mb-2">
                  {t('typesOfCookies.functional.description')}
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>{t('typesOfCookies.functional.examples.language')}</li>
                  <li>{t('typesOfCookies.functional.examples.preferences')}</li>
                  <li>{t('typesOfCookies.functional.examples.cart')}</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  {t('typesOfCookies.analytics.title')}
                </h3>
                <p className="text-yellow-700 mb-2">
                  {t('typesOfCookies.analytics.description')}
                </p>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>{t('typesOfCookies.analytics.examples.usage')}</li>
                  <li>{t('typesOfCookies.analytics.examples.performance')}</li>
                  <li>{t('typesOfCookies.analytics.examples.errors')}</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  {t('typesOfCookies.marketing.title')}
                </h3>
                <p className="text-purple-700 mb-2">
                  {t('typesOfCookies.marketing.description')}
                </p>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>{t('typesOfCookies.marketing.examples.ads')}</li>
                  <li>{t('typesOfCookies.marketing.examples.social')}</li>
                  <li>{t('typesOfCookies.marketing.examples.tracking')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('cookiesWeUse.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookiesWeUse.description')}
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {t('cookiesWeUse.table.name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {t('cookiesWeUse.table.purpose')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {t('cookiesWeUse.table.duration')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {t('cookiesWeUse.table.type')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      next-intl-locale
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.locale.purpose')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.locale.duration')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {t('cookiesWeUse.table.rows.locale.type')}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      drukarnia-cart
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.cart.purpose')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.cart.duration')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {t('cookiesWeUse.table.rows.cart.type')}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      _ga, _ga_*
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.analytics.purpose')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t('cookiesWeUse.table.rows.analytics.duration')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        {t('cookiesWeUse.table.rows.analytics.type')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('manageCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('manageCookies.description')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('manageCookies.browserSettings')}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">
                {t('manageCookies.note.title')}
              </p>
              <p className="text-blue-700">
                {t('manageCookies.note.description')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('changes.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('contact.description')}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Drukarnia Graften</strong><br />
                {t('contact.address')}<br />
                Email: {t('contact.email')}<br />
                {t('contact.phone')}: +48 123 456 789
              </p>
            </div>
          </section>
        </div>
      </div>
    </LegalLayout>
  );
}
