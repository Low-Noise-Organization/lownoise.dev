import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: "96px 24px" }}>
      <p className="label">404 // NOT FOUND</p>
      <h1 className="display" style={{ marginTop: 8 }}>Nothing here.</h1>
      <p className="dim" style={{ marginTop: 16 }}>Less noise, also fewer pages.</p>
      <div className="cta">
        <Link className="btn primary" href="/">Back home</Link>
      </div>
    </main>
  );
}
