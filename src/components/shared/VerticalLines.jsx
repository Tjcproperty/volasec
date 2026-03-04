export default function VerticalLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="mx-auto h-full max-w-7xl">
        <div className="relative h-full">
          <div className="absolute left-0 top-0 h-full w-px bg-primary-30" />
          <div className="absolute right-0 top-0 h-full w-px bg-primary-30" />
        </div>
      </div>
    </div>
  );
}
