import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f0c16',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #8b5cf6 2%, transparent 0%), radial-gradient(circle at 75px 75px, #4f46e5 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ color: '#8b5cf6', fontSize: 32, fontWeight: 800 }}>Whispers Within</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '30px',
              maxWidth: '850px',
            }}
          >
            {title || 'Blog & Guides'}
          </div>
          <div style={{ display: 'flex', color: '#a1a1aa', fontSize: 24 }}>
            The ultimate anonymous messaging platform.
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(e.message);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
