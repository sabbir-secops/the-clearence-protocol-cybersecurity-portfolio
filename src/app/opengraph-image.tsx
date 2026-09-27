import {
  ImageResponse,
} from "next/og";

export const alt =
  "Md. Sabbir Hossain | Cybersecurity Product Engineer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width:
            "100%",
          height:
            "100%",
          display:
            "flex",
          position:
            "relative",
          overflow:
            "hidden",
          background:
            "#080b0f",
          color:
            "#eef5f8",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            display:
              "flex",
            backgroundImage:
              "linear-gradient(rgba(72,215,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(72,215,255,0.055) 1px, transparent 1px)",
            backgroundSize:
              "54px 54px",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            width:
              520,
            height:
              520,
            borderRadius:
              520,
            right:
              -110,
            top:
              -120,
            display:
              "flex",
            background:
              "rgba(72,215,255,0.08)",
            boxShadow:
              "0 0 160px rgba(72,215,255,0.16)",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            width:
              360,
            height:
              360,
            borderRadius:
              360,
            right:
              72,
            top:
              116,
            display:
              "flex",
            border:
              "1px solid rgba(72,215,255,0.22)",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            width:
              250,
            height:
              250,
            borderRadius:
              250,
            right:
              127,
            top:
              171,
            display:
              "flex",
            border:
              "1px solid rgba(238,245,248,0.14)",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            width:
              90,
            height:
              90,
            borderRadius:
              90,
            right:
              207,
            top:
              251,
            display:
              "flex",
            border:
              "1px solid rgba(72,215,255,0.5)",
            background:
              "rgba(72,215,255,0.08)",
            boxShadow:
              "0 0 70px rgba(72,215,255,0.24)",
          }}
        />

        <div
          style={{
            position:
              "relative",
            display:
              "flex",
            flexDirection:
              "column",
            justifyContent:
              "space-between",
            width:
              "100%",
            height:
              "100%",
            padding:
              "72px 78px",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap:
                14,
              color:
                "#48d7ff",
              fontSize:
                22,
              letterSpacing:
                "0.18em",
              textTransform:
                "uppercase",
            }}
          >
            <span>
              The Clearance Protocol
            </span>

            <span
              style={{
                color:
                  "#6f7d87",
              }}
            >
              |
            </span>

            <span>
              Public Access
            </span>
          </div>

          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              maxWidth:
                760,
              gap:
                20,
            }}
          >
            <div
              style={{
                display:
                  "flex",
                fontSize:
                  68,
                lineHeight:
                  1,
                fontWeight:
                  700,
                letterSpacing:
                  "-0.05em",
              }}
            >
              MD. SABBIR HOSSAIN
            </div>

            <div
              style={{
                display:
                  "flex",
                maxWidth:
                  700,
                color:
                  "#eef5f8",
                fontSize:
                  35,
                lineHeight:
                  1.2,
                fontWeight:
                  600,
              }}
            >
              Cybersecurity Product Engineer
            </div>

            <div
              style={{
                display:
                  "flex",
                maxWidth:
                  720,
                color:
                  "#aebbc4",
                fontSize:
                  23,
                lineHeight:
                  1.45,
              }}
            >
              Secure Systems | Web and App Engineering | Infrastructure | Technical SEO
            </div>
          </div>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              color:
                "#71818c",
              fontSize:
                19,
              letterSpacing:
                "0.12em",
              textTransform:
                "uppercase",
            }}
          >
            <span>
              Build | Secure | Verify
            </span>

            <span>
              buildwithsabbir.com
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
