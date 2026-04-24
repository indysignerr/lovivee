export function BrickBand() {
  return (
    <div className="relative" aria-hidden>
      <div className="brick-band h-[120px] md:h-[160px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,248,243,0.7) 0%, rgba(250,248,243,0) 18%, rgba(250,248,243,0) 82%, rgba(30,43,79,0.06) 100%)",
        }}
      />
    </div>
  );
}
