export function RouteLoading() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-10" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div aria-hidden="true" className="grid gap-6">
        <div className="loading-weave h-4 w-40 rounded-[2px]" />
        <div className="loading-weave h-14 w-full max-w-2xl rounded-[3px]" />
        <div className="loading-weave h-6 w-full max-w-xl rounded-[3px]" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="loading-weave aspect-[4/3] rounded-[var(--radius-md)]" />
          ))}
        </div>
      </div>
    </div>
  );
}
