import { ImageResponse } from 'next/og';

export const alt = 'Weftline Collective — We are the crossing thread. A VIZAM concept project (fictional organization).';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#16193a',
          color: '#f5f0e6',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(245,240,230,0.08) 0 1px, transparent 1px 16px)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#e2a53a' }}>Weftline Collective</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>We are the</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3, color: '#e2a53a' }}>crossing thread.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26 }}>VIZAM concept project — fictional organization</div>
      </div>
    ),
    size,
  );
}
