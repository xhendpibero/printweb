import { useTranslations } from 'next-intl';
import { LegalLayout } from '@/components/layout';

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacy');

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
              {t('dataCollection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataCollection.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('dataCollection.personal.name')}</li>
              <li>{t('dataCollection.personal.email')}</li>
              <li>{t('dataCollection.personal.phone')}</li>
              <li>{t('dataCollection.personal.address')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataUsage.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataUsage.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('dataUsage.purposes.orders')}</li>
              <li>{t('dataUsage.purposes.communication')}</li>
              <li>{t('dataUsage.purposes.support')}</li>
              <li>{t('dataUsage.purposes.legal')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('dataSecurity.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('dataSecurity.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookies.description')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('cookies.management')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('rights.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('rights.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('rights.list.access')}</li>
              <li>{t('rights.list.rectification')}</li>
              <li>{t('rights.list.erasure')}</li>
              <li>{t('rights.list.portability')}</li>
              <li>{t('rights.list.objection')}</li>
            </ul>
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
