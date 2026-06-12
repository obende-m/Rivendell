import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center text-center px-6">
      <span className="font-label-caps text-label-caps text-primary tracking-[0.4em] mb-4 block select-none">
        404 ERROR
      </span>
      <h1 className="font-display-xl text-4xl sm:text-5xl md:text-6xl italic mb-6">
        Page Not Found.
      </h1>
      <p className="font-body-md text-on-surface-variant text-sm max-w-md mb-12 leading-relaxed">
        The architectural plane you requested does not exist or has been relocated within
        our blueprints.
      </p>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
