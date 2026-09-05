import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const username = searchParams.get('username');

    if (username) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#090714',
              backgroundImage:
                'radial-gradient(circle at 15% 15%, rgba(139, 92, 246, 0.25) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(99, 102, 241, 0.2) 0%, transparent 45%)',
              padding: '60px',
              fontFamily: 'sans-serif',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 24px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#c4b5fd',
                fontSize: 22,
                fontWeight: 700,
                marginBottom: '28px',
              }}
            >
              🤫 Whispers Within
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '900px',
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: '#94a3b8',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                Send an anonymous whisper to
              </div>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '28px',
                  letterSpacing: '-0.02em',
                }}
              >
                @{username}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                color: '#94a3b8',
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              <span>🔒 100% Anonymous</span>
              <span>•</span>
              <span>✨ No Account Required</span>
              <span>•</span>
              <span>🛡️ AI Moderated</span>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

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
            backgroundColor: '#090714',
            backgroundImage:
              'radial-gradient(circle at 15% 15%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(79, 70, 229, 0.18) 0%, transparent 50%)',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              color: '#c4b5fd',
              fontSize: 22,
              fontWeight: 700,
              marginBottom: '32px',
            }}
          >
            Whispers Within
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 58,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '28px',
              maxWidth: '920px',
              letterSpacing: '-0.02em',
            }}
          >
            {title || 'Blog & Guides'}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: '#94a3b8',
              fontSize: 22,
            }}
          >
            <span>By Shiva</span>
            <span>•</span>
            <span>India&apos;s 100% Free Anonymous Messaging Platform</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response('Failed to generate the image', { status: 500 });
  }
}
