import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-warm-white px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-gold text-4xl shadow-lg">🧭</div>
        <h1 className="font-display text-6xl text-navy">Lost at sea</h1>
        <p className="mt-3 text-navy/70">
          This page drifted off the map. Let's chart a course back to shore.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-ocean px-6 py-3 font-display text-lg font-bold text-white shadow-lg shadow-ocean/30 transition-transform hover:-translate-y-0.5"
        >
          Return to home port
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-warm-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-navy">Something went overboard</h1>
        <p className="mt-2 text-sm text-navy/70">
          Try again, or head back to the home port.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-2xl bg-ocean px-5 py-2.5 text-sm font-bold text-white hover:bg-ocean-deep"
          >
            Try again
          </button>
          <a href="/" className="rounded-2xl border border-navy/10 bg-white px-5 py-2.5 text-sm font-bold text-navy hover:bg-sand-soft">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Edventure Printables — Learning Through Edventure" },
      { name: "description", content: "Turn maths practice into an Edventure. Premium printable maths activities children aged 5–10 actually love." },
      { name: "author", content: "Edventure Printables" },
      { property: "og:title", content: "Edventure Printables — Learning Through Edventure" },
      { property: "og:description", content: "Turn maths practice into an Edventure. Premium printable maths activities children aged 5–10 actually love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Edventure Printables — Learning Through Edventure" },
      { name: "twitter:description", content: "Turn maths practice into an Edventure. Premium printable maths activities children aged 5–10 actually love." },
      { property: "og:image", content: "https://edventureprintables.shop/og-image.png" },
      { name: "twitter:image", content: "https://edventureprintables.shop/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Poppins:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "text/javascript",
        src: "https://analytics.day.ag/script.js",
        defer: true,
        "data-website-id": "60d54e21-cc59-4dc6-9a51-8370a001ea4f",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </QueryClientProvider>
  );
}
