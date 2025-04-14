import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
export const runtime = 'edge';
export const dynamic = 'force-static';


// Font loading
const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const font = fetch(`${baseURL}/fonts/PPNeueMontreal-Regular.woff`).then((res) =>
  res.arrayBuffer()
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'ArtPill Studio';
    const description = searchParams.get('description') || 'Global Design Studio';
    const mode = searchParams.get('mode') || 'light';
    const category = searchParams.get('category') || '';

    const fontData = await font;

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
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ fontSize: 28, fontWeight: 500 }}>ArtPill Studio</div>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 40, marginBottom: 40, maxWidth: 600 }}>
            {category && (
              <div
                style={{
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
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.2, marginBottom: 24, maxWidth: '80%' }}>
              {title}
            </div>
            <div style={{ fontSize: 24, fontWeight: 400, opacity: 0.8, maxWidth: '70%' }}>
              {description}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ fontSize: 16, opacity: 0.7 }}>Based in Paris • Designing Worldwide</div>
            <div style={{ fontSize: 16, opacity: 0.7 }}>artpill.studio</div>
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
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
