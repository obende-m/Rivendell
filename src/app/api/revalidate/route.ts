import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = req.headers.get("x-revalidate-secret");

    if (token !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid token credentials" }, { status: 401 });
    }

    const type = body?._type;
    const slug = body?.slug?.current;

    // Trigger path revalidations based on document types
    if (type === "homepage") {
      revalidatePath("/");
    } else if (type === "project") {
      revalidatePath("/");
      revalidatePath("/projects");
      if (slug) {
        revalidatePath(`/projects/${slug}`);
      }
    } else if (type === "service") {
      revalidatePath("/");
      revalidatePath("/services");
      if (slug) {
        revalidatePath(`/services/${slug}`);
      }
    } else if (type === "development") {
      revalidatePath("/developments");
      if (slug) {
        revalidatePath(`/developments/${slug}`);
      }
    } else if (type === "siteSettings" || type === "navigation" || type === "footer") {
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Internal Error" }, { status: 500 });
  }
}
