import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "passos-verdes:onboarding-v1";

type Variant = "light" | "dark";

type NextStepCardProps = {
  variant?: Variant;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

function readName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { answers?: { name?: string } };
    const name = parsed.answers?.name?.trim();
    if (!name) return null;
    return name.split(" ")[0];
  } catch {
    return null;
  }
}

export function NextStepCard({
  variant = "light",
  title,
  description,
  primaryLabel = "Ver os planos",
  primaryHref = "#planos",
}: NextStepCardProps) {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(readName());
  }, []);

  const greeting = firstName ? `${firstName}, ` : "";
  const heading =
    title ?? `${firstName ? firstName + ", suas" : "Suas"} respostas estão salvas.`;
  const body =
    description ??
    `${greeting}seu plano está sendo montado pelo nosso time. Enquanto isso, escolha o nível de acompanhamento que combina com você — é o próximo passo pra começar de verdade.`;

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 max-w-md mx-auto lg:ml-auto relative z-10 ${
        variant === "dark"
          ? "bg-foreground text-background border-foreground/20"
          : "bg-card text-foreground border-card-border shadow-xl"
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            variant === "dark"
              ? "bg-primary/20 text-primary"
              : "bg-primary/10 text-primary"
          }`}
        >
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              variant === "dark" ? "text-primary" : "text-primary"
            }`}
          >
            Próximo passo
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold leading-tight mt-1">
            {heading}
          </h3>
        </div>
      </div>

      <p
        className={`leading-relaxed mb-6 ${
          variant === "dark" ? "text-background/75" : "text-muted-foreground"
        }`}
      >
        {body}
      </p>

      <div className="space-y-3">
        <Button asChild size="lg" className="w-full font-bold">
          <a href={primaryHref}>
            {primaryLabel}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <div
          className={`flex items-center gap-2 text-sm ${
            variant === "dark" ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span>Vamos te chamar no WhatsApp em até 24h.</span>
        </div>
      </div>
    </div>
  );
}
