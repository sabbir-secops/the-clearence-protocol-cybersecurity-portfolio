import {
  ImageResponse,
} from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType =
  "image/png";

export default function Icon() {
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
            16,
          background:
            "#080b0f",
          border:
            "2px solid #48d7ff",
          color:
            "#eef5f8",
          fontSize:
            26,
          fontWeight:
            700,
          fontFamily:
            "Arial, sans-serif",
          boxShadow:
            "inset 0 0 18px rgba(72,215,255,0.18)",
        }}
      >
        S
      </div>
    ),
    size
  );
}
