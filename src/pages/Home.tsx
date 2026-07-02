import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { APP_TAGLINE, APP_TITLE } from '../constants/app';

function Home() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
            AI-powered car guidance
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {APP_TITLE}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              {APP_TAGLINE}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/404">
              <Button variant="primary">Start Finding Cars</Button>
            </Link>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <Card title="What to expect" description="A polished frontend foundation for your AI car discovery experience." className="space-y-4">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">Responsive hero section and reusable UI.</li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">Typed components and service-ready API setup.</li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">Clean route structure for future expansion.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}

export default Home;
