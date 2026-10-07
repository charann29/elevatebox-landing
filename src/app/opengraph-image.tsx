import { ImageResponse } from "next/og";

export const alt = "ElevateBox — a product studio building AI software for India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(160deg, #0a1f4f 0%, #07163a 100%)", color: "white" }}>
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#9db8ff" }}>ELEVATEBOX · PRODUCT STUDIO</div>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
          We build products for the problems India runs into every day.
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>elevatebox.in</div>
      </div>
    ),
    size,
  );
}
