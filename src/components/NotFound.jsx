import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">404 error</p>
      <h1 className="mt-3 text-5xl font-black text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-4 text-slate-500 dark:text-slate-400">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-8 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200">Back to home</Link>
    </div>
  );
}
