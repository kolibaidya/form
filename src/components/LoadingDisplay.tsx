export default function LoadingDisplay() {
  return (
    <div className="flex items-center justify-center p-8" role="status" aria-label="Loading">
      <div className="relative">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-600" />
      </div>
      <span className="ml-3 text-sm font-medium text-zinc-600">Loading…</span>
    </div>
  );
}
