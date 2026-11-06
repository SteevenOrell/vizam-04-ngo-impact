'use client';

// Last-resort boundary when the root layout itself fails. Kept dependency-free on purpose.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f5f0e6', color: '#16193a' }}>
        <div id="root" style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px' }} role="alert">
          <h1 style={{ fontSize: '2.25rem', lineHeight: 1.1 }}>Weftline Collective is having trouble loading.</h1>
          <p style={{ fontSize: '1.125rem' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ minHeight: 48, padding: '12px 20px', background: '#a8402c', color: '#fff', border: 0, borderRadius: 5, fontWeight: 700, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
