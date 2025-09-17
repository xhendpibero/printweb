import { useTranslations } from "next-intl";
import {
  Printer,
  Clock,
  Settings,
  ArrowRight,
  CheckCircle2,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  Quote,
} from "lucide-react";
import { MainLayout } from "@/components/layout";
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations("homepage");

  const steps = [
    { title: "Choose product", desc: "Select size, paper, finish, quantity" },
    { title: "Upload files", desc: "Drag and drop PDFs or images" },
    { title: "Approve proof", desc: "Review a live preview before pay" },
    { title: "We print", desc: "Production starts within 24 hours" },
    { title: "Fast delivery", desc: "Tracked shipping to your door" },
  ];

  const categories = [
    {
      name: "Business Cards",
      desc: "Premium papers and finishes",
      img: "/products/wizytowki-standardowe.webp",
    },
    {
      name: "Flyers",
      desc: "Affordable and fast",
      img: "/products/flyer.webp",
    },
    {
      name: "Stickers",
      desc: "Durable, kiss cut or die cut",
      img: "/products/etykiety-do-aplikacji-recznej.webp",
    },
    {
      name: "Posters",
      desc: "High color accuracy",
      img: "/products/poster.webp",
    },
  ];

  const highlights = [
    { icon: Shield, title: "Secure checkout", desc: "SSL and PCI compliant" },
    {
      icon: CheckCircle2,
      title: "Quality guarantee",
      desc: "Reprint or refund if not satisfied",
    },
    { icon: Clock, title: "Same day options", desc: "Order before 10 AM" },
  ];

  const testimonials = [
    {
      name: "Daniel K",
      role: "Cafe owner",
      quote: "Colors look perfect, turnaround was fast.",
      rating: 5,
    },
    {
      name: "Maya S",
      role: "Designer",
      quote: "The proofing step saved my project.",
      rating: 5,
    },
    {
      name: "Arif P",
      role: "Event planner",
      quote: "Reliable delivery, great support.",
      rating: 4,
    },
  ];

  const faqs = [
    {
      q: "What file types are supported",
      a: "PDF, PNG, JPG, and SVG for vector logos",
    },
    {
      q: "Do you check my files",
      a: "Yes, we run basic preflight and alert issues",
    },
    {
      q: "How long does shipping take",
      a: "1 to 3 business days in most cities",
    },
    {
      q: "Can I order a sample",
      a: "Yes, sample packs are available on request",
    },
  ];

  return (
    <MainLayout className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {" "}
        {/* Announcement bar */}
        <div className="py-2 text-center text-sm text-indigo-900">
          Free reprint guarantee. New users get 10 percent off at checkout
        </div>
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t("hero.heading")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="en/search?product=flyers"
              className="px-8 py-3 rounded-lg text-lg font-semibold bg-white text-indigo-700 hover:bg-indigo-50 transition-colors"
            >
              Browse catalog
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              Secure payments
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              24 hour production
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Reprint guarantee
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Printer className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("features.quality.title")}
            </h3>
            <p className="text-gray-600">{t("features.quality.description")}</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("features.speed.title")}
            </h3>
            <p className="text-gray-600">{t("features.speed.description")}</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("features.configurator.title")}
            </h3>
            <p className="text-gray-600">
              {t("features.configurator.description")}
            </p>
          </div>
        </div>
        {/* Highlights strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-indigo-600 text-white rounded-xl p-4 flex items-start gap-3"
            >
              <h.icon className="w-5 h-5 mt-1" />
              <div>
                <div className="font-semibold">{h.title}</div>
                <div className="text-indigo-100 text-sm">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Categories grid */}
        <div id="catalog" className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Popular products
            </h2>
            <Link
              href="en/products/flyers"
              className="text-indigo-700 hover:text-indigo-800 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <Link
                key={i}
                href={`en/products/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-sm text-gray-600">{c.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Steps */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How ordering works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow text-center"
              >
                <div className="mx-auto w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <div className="font-semibold text-gray-900">{s.title}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              What customers say
            </h2>
            <div className="text-sm text-gray-600">
              4.8 out of 5 based on 1,200 reviews
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tst, i) => (
              <div key={i} className="border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: 5 }).map((_, r) => (
                    <Star
                      key={r}
                      className={`w-4 h-4 ${r < tst.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mb-3 text-gray-700">
                  <Quote className="w-4 h-4 mt-1 text-indigo-600" />
                  <p>{tst.quote}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {tst.name}, {tst.role}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pricing teaser */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow border border-indigo-100">
            <div className="text-sm font-semibold text-indigo-700 mb-2">
              Starter
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">From $9</div>
            <div className="text-sm text-gray-600 mb-4">
              Business cards 100 pcs
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Matte or glossy</li>
              <li>Free online proof</li>
              <li>2 day production</li>
            </ul>
            <Link
              href="en/products/business-cards"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
            >
              Start order
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow border">
            <div className="text-sm font-semibold text-indigo-700 mb-2">
              Pro
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              From $29
            </div>
            <div className="text-sm text-gray-600 mb-4">Flyers 500 pcs</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Full color both sides</li>
              <li>Priority production</li>
              <li>Tracked shipping</li>
            </ul>
            <Link
              href="en/products/flyers"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
            >
              Start order
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow border">
            <div className="text-sm font-semibold text-indigo-700 mb-2">
              Business
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">Custom</div>
            <div className="text-sm text-gray-600 mb-4">
              High volume or special finishes
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Spot UV, foils, emboss</li>
              <li>Dedicated support</li>
              <li>Contract pricing</li>
            </ul>
            <Link
              href="en/contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
            >
              Get a quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-5 shadow">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        {/* Contact CTA */}
        <div className="mt-16 mb-20 bg-indigo-700 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-2xl font-bold">
                Need help choosing materials
              </div>
              <div className="text-indigo-100">
                Talk to a print specialist and get a free file check
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="tel:+62123456789"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-3 rounded-lg font-semibold"
              >
                <Phone className="w-5 h-5" />
                Call us
              </Link>
              <Link
                href="en/contact"
                className="inline-flex items-center gap-2 border border-white px-5 py-3 rounded-lg font-semibold"
              >
                <Mail className="w-5 h-5" />
                Send message
              </Link>
            </div>
          </div>
        </div>
        {/* Footer mini */}
        <div className="pb-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            Jakarta, Indonesia
          </div>
          <div>© {new Date().getFullYear()} Your Print Shop</div>
        </div>
      </div>
    </MainLayout>
  );
}
