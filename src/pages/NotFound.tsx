import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center shadow-2xl shadow-slate-950/40">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">404</p>
        <h1 className="mb-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mb-8 text-lg text-slate-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
