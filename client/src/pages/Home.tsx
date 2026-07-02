import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { APP_TAGLINE, APP_TITLE } from '../constants/app';
import { FeatureCard } from '../components/home/FeatureCard';
import { HeroIllustration } from '../components/home/HeroIllustration';

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_20%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-slate-950/90 to-transparent" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.95fr] xl:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-sky-300 shadow-sm shadow-sky-950/20 backdrop-blur-xl">
              Premium AI car recommendations for modern buyers
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find Your Perfect Car with AI
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                Answer a few simple questions and receive personalized car recommendations based on your budget, lifestyle, and priorities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/buyer-preferences">
                <Button variant="primary" className="min-w-45">Find My Car</Button>
              </Link>
              <Link to="/buyer-preferences">
                <Button variant="outline" className="min-w-45">Browse Cars</Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard
                title="Tailored to your budget"
                description="AI matches your preferences with real car options and real value."
              />
              <FeatureCard
                title="Luxury-grade experience"
                description="Modern glassmorphism, premium spacing, and smooth interactions across devices."
              />
              <FeatureCard
                title="Designed for trust"
                description="Clear recommendations, safety indicators, and easy comparison at a glance."
              />
            </div>
          </div>

          <div className="relative">
            <HeroIllustration />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
