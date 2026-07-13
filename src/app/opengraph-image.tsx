import { ImageResponse } from "next/og"

export const alt = "Low Noise — Software Engineering"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #07090e 0%, #0c0f18 50%, #07090e 100%)",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(75,130,245,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(0,201,160,0.1) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 600,
              letterSpacing: "-3px",
              color: "#d4daf0",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            LOW NOISE
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#4b82f5",
              fontWeight: 500,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Software Engineering
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#56607e",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Adrián Velasco · Backend Developer · Java · Ciberseguridad · Sistemas
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00c9a0",
            }}
          />
          <span style={{ color: "#42485e", fontSize: "14px", letterSpacing: "2px" }}>
            CÓRDOBA, ES
          </span>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00c9a0",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
