import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Insight ${slug}`,
    description: "Architectural and design notes from Rivendell Consults.",
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Since we don't have mock posts, we'll return 404 for now to keep routing clean and correct
  notFound();

  return (
    <div className="pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-playfair text-3xl mb-4 text-on-surface">Insight post &ldquo;{slug}&rdquo;</h1>
      <Link href="/blog">
        <Button variant="outline">Back to Insights</Button>
      </Link>
    </div>
  );
}
