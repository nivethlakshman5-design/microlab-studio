import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?inline";
import appMetaJson from "../app-meta.json";
type Meta = { og_title?: string | null; og_description?: string | null; og_image_url?: string | null; favicon_url?: string | null; og_video_url?: string | null };
const meta = appMetaJson as Meta;
function buildHead() {
 const title = meta.og_title || "MicroLab Studio | Learn Arduino, ESP32 and Electronics";
 const description = meta.og_description || "Learn Arduino and ESP32 by editing sketches, exploring short lessons and trying a simplified virtual circuit lab.";
 const siteUrl = "https://nivethlakshman5-design.github.io/microlab-studio/";
 const image = `${siteUrl}assets/brand/microlab-og.png`;
 return { meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }, { title }, { name: "description", content: description }, { name: "author", content: "MicroLab Studio" }, { name: "theme-color", content: "white" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:image", content: image }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title }, { name: "twitter:description", content: description }, { name: "twitter:image", content: image }, ...(meta.og_video_url ? [{ property: "og:video", content: meta.og_video_url }] : [])], links: [{ rel: "icon", href: `${import.meta.env.BASE_URL}assets/brand/favicon.svg`, type: "image/svg+xml" }, { rel: "icon", href: `${import.meta.env.BASE_URL}assets/brand/favicon-32.png`, sizes: "32x32", type: "image/png" }, { rel: "shortcut icon", href: `${import.meta.env.BASE_URL}assets/brand/favicon.ico` }, { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}assets/brand/apple-touch-icon.png` }, { rel: "manifest", href: `${import.meta.env.BASE_URL}site.webmanifest` }, { rel: "canonical", href: siteUrl }] };
}
function NotFound() { return <main className="not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>This path isn't on the board.</h1><p>Head back to the MicroLab Studio workbench and keep building.</p><Link to="/" className="header-start">Return to MicroLab Studio →</Link></main>; }
function ErrorView({ error, reset }: { error: Error; reset: () => void }) { const router = useRouter(); useEffect(() => { console.error(error); }, [error]); return <main className="not-found"><p className="eyebrow">WORKSPACE ERROR</p><h1>This page didn't load.</h1><p>Refresh the workspace or return to the main learning studio.</p><div className="error-actions"><button className="header-start" onClick={() => { router.invalidate(); reset(); }}>Try again</button><a className="outline-button" href="/">Go to home</a></div></main>; }
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({ head: buildHead, shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFound, errorComponent: ErrorView });
function RootShell({ children }: { children: ReactNode }) { return <html lang="en" style={{ colorScheme: "light" }}><head><HeadContent /><style dangerouslySetInnerHTML={{ __html: appCss }} /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
