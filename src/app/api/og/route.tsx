import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';




// Font loading
const font = fetch(
  new URL('../../../fonts/PPNeueMontreal-Regular.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get query parameters
    const title = searchParams.get('title') || 'ArtPill Studio';
    const description = searchParams.get('description') || 'Global Design Studio';
    const mode = searchParams.get('mode') || 'light';
    const category = searchParams.get('category') || '';

    // Load font data
    const fontData = await font;

    // Colors based on mode
    const backgroundColor = mode === 'dark' ? '#121212' : '#ececec';
    const textColor = mode === 'dark' ? '#f5f5f5' : '#121212';
    const accentColor = '#dcfb44';

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: 50,
            backgroundColor,
            color: textColor,
            fontFamily: '"PPNeueMontreal"',
          }}
        >
          {/* Top bar with logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                }}
              >
                ArtPill Studio
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: 40,
              marginBottom: 40,
              maxWidth: 600,
            }}
          >
            {category && (
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: accentColor,
                  color: '#000',
                  fontSize: 16,
                  padding: '6px 12px',
                  borderRadius: 4,
                  marginBottom: 24,
                }}
              >
                {category}
              </div>
            )}

            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 24,
                maxWidth: '80%',
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                lineHeight: 1.5,
                opacity: 0.8,
                maxWidth: '70%',
              }}
            >
              {description}
            </div>
          </div>

          {/* Bottom bar with branding */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: accentColor,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  marginRight: 8,
                }}
              />
              <div
                style={{
                  fontSize: 16,
                  opacity: 0.7,
                }}
              >
                Based in Paris • Designing Worldwide
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                opacity: 0.7,
              }}
            >
              artpill.studio
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'PPNeueMontreal',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
