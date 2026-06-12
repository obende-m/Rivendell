export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center text-center select-none">
      <span className="font-label-caps text-[10px] text-primary tracking-[0.35em] mb-6 block animate-pulse uppercase">
        Drawing Blueprints...
      </span>
      <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-full bg-primary animate-scroll-indicator" />
      </div>
    </div>
  );
}
