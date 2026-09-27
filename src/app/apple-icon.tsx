import {
  ImageResponse,
} from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType =
  "image/png";

export default function AppleIcon() {
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
          alignItems:
            "center",
          justifyContent:
            "center",
          borderRadius:
            42,
          background:
            "#080b0f",
          border:
            "4px solid #48d7ff",
          color:
            "#eef5f8",
          fontSize:
            78,
          fontWeight:
            700,
          fontFamily:
            "Arial, sans-serif",
          boxShadow:
            "inset 0 0 42px rgba(72,215,255,0.18)",
        }}
      >
        S
      </div>
    ),
    size
  );
}
