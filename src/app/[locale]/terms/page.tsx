import { useTranslations } from 'next-intl';
import { LegalLayout } from '@/components/layout';

export default function TermsOfServicePage() {
  const t = useTranslations('legal.terms');

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
              {t('acceptance.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('acceptance.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('services.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t('services.list.printing')}</li>
              <li>{t('services.list.design')}</li>
              <li>{t('services.list.delivery')}</li>
              <li>{t('services.list.support')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('orders.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('orders.process')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('orders.confirmation')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('orders.cancellation')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('payment.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('payment.methods')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('payment.terms')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('delivery.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('delivery.timeframes')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('delivery.responsibility')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('quality.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('quality.guarantee')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('quality.complaints')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('liability.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('liability.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('intellectual.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('intellectual.description')}
            </p>
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
