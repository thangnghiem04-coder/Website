import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/article/military-supply-chain")({
  validateSearch: (search: Record<string, unknown>) => ({
    lang: search["lang"] === "vi" ? "vi" as const : "en" as const,
  }),
  head: () => ({
    meta: [
      { title: "The Hidden Networks of the Global Military Supply Chain" },
      { name: "description", content: "Exploring the hidden global networks and geopolitics of the military supply chain." },
      { property: "og:title", content: "The Hidden Networks of the Global Military Supply Chain" },
      { property: "og:description", content: "Exploring the hidden global networks and geopolitics of the military supply chain." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MilitarySupplyChainArticle,
});

function MilitarySupplyChainArticle() {
  const { lang } = Route.useSearch();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <main className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-background">
      <iframe
        src={`/articles/military-supply-chain.html?lang=${lang}`}
        title="The Hidden Networks of the Global Military Supply Chain"
        className="absolute inset-0 h-[100dvh] w-screen border-0"
      />
      <Button
        asChild
        variant="outline"
        className="fixed left-4 top-4 z-[101] h-9 border-border bg-background/90 px-3 text-xs text-foreground shadow-md backdrop-blur-sm hover:bg-background md:left-6 md:top-6"
      >
        <a href="/#perspective"><ArrowLeft className="h-4 w-4" /> Back</a>
      </Button>
    </main>
  );
}