import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Activity,
  Clock,
  Target,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-passos-verdes.png";

const STORAGE_KEY = "passos-verdes:onboarding-v1";

type Answers = {
  name: string;
  whatsapp: string;
  age: string;
  activityLevel: string;
  timeAvailable: string;
  goal: string;
  obstacle: string;
};

const initialAnswers: Answers = {
  name: "",
  whatsapp: "",
  age: "",
  activityLevel: "",
  timeAvailable: "",
  goal: "",
  obstacle: "",
};

type Choice = { value: string; label: string; description?: string };

type Step =
  | {
      kind: "intro";
      icon: React.ReactNode;
      eyebrow: string;
      title: string;
      lead: string;
      bullets: { title: string; body: string }[];
    }
  | {
      kind: "choice";
      icon: React.ReactNode;
      eyebrow: string;
      title: string;
      lead?: string;
      field: keyof Answers;
      options: Choice[];
    }
  | {
      kind: "form";
      icon: React.ReactNode;
      eyebrow: string;
      title: string;
      lead?: string;
    };

const steps: Step[] = [
  {
    kind: "intro",
    icon: <Heart className="h-6 w-6" />,
    eyebrow: "Antes de começar",
    title: "Por que esse questionário existe?",
    lead:
      "Antes de te mostrar a Passos Verdes, queremos entender você. Sua rotina, seu corpo, seu momento. É assim que a gente monta um plano que cabe na sua vida — e não um treino genérico que você vai abandonar em duas semanas.",
    bullets: [
      {
        title: "Movimentar o corpo é remédio",
        body:
          "Pessoas sedentárias têm até 30% mais risco de doenças cardíacas, diabetes e ansiedade. Trinta minutos por dia já mudam essa estatística.",
      },
      {
        title: "Correr é o atalho mais barato",
        body:
          "Sem mensalidade de academia, sem equipamento caro. Um par de tênis, a rua e um plano que respeita o seu ritmo.",
      },
      {
        title: "Esse plano é seu, ninguém mais",
        body:
          "Suas respostas aqui viram um treino adaptado para o seu corpo, seu tempo livre e seu objetivo real.",
      },
    ],
  },
  {
    kind: "choice",
    icon: <Activity className="h-6 w-6" />,
    eyebrow: "Pergunta 1 de 5",
    title: "Como está seu corpo hoje?",
    lead:
      "Seja honesto. Não tem certo ou errado — tem ponto de partida.",
    field: "activityLevel",
    options: [
      {
        value: "sedentary",
        label: "Sedentário(a) total",
        description:
          "Faz meses ou anos sem treinar. Subir escada já cansa.",
      },
      {
        value: "occasional",
        label: "Me mexo de vez em quando",
        description:
          "Caminho às vezes, mas sem rotina. Começo e paro o tempo todo.",
      },
      {
        value: "regular",
        label: "Treino 1-2 vezes por semana",
        description:
          "Já tenho alguma constância, mas quero evoluir de verdade.",
      },
      {
        value: "active",
        label: "Já corro com regularidade",
        description:
          "Corro 3+ vezes por semana e quero melhorar meu pace ou distância.",
      },
    ],
  },
  {
    kind: "choice",
    icon: <Clock className="h-6 w-6" />,
    eyebrow: "Pergunta 2 de 5",
    title: "Quanto tempo você consegue dedicar por semana?",
    lead:
      "Pode parecer pouco, mas 90 minutos bem usados já transformam um corpo em 8 semanas.",
    field: "timeAvailable",
    options: [
      {
        value: "lt2",
        label: "Menos de 2 horas",
        description: "Tenho a rotina apertada — preciso de um plano enxuto.",
      },
      {
        value: "2to4",
        label: "2 a 4 horas",
        description: "Consigo encaixar 3 treinos curtos na semana.",
      },
      {
        value: "4to6",
        label: "4 a 6 horas",
        description: "Treinar é prioridade. Posso somar treinos longos.",
      },
      {
        value: "6plus",
        label: "Mais de 6 horas",
        description: "Quero performance — tempo não é o meu limitador.",
      },
    ],
  },
  {
    kind: "choice",
    icon: <Target className="h-6 w-6" />,
    eyebrow: "Pergunta 3 de 5",
    title: "Qual é o seu objetivo principal agora?",
    field: "goal",
    options: [
      {
        value: "first_5k",
        label: "Sair do zero e correr meus primeiros 5km",
        description:
          "Plano de 8 semanas com caminhada + corrida progressiva.",
      },
      {
        value: "weight_loss",
        label: "Emagrecer correndo, sem sofrer",
        description:
          "Foco em queima calórica gradual e constância de longo prazo.",
      },
      {
        value: "conditioning",
        label: "Ganhar fôlego e disposição no dia a dia",
        description: "Subir escada sem ofegar, dormir melhor, render mais.",
      },
      {
        value: "10k_pace",
        label: "Evoluir para 10km e baixar meu pace",
        description: "Treinos intervalados, longão e plano de progressão.",
      },
      {
        value: "race",
        label: "Me preparar para uma prova oficial",
        description: "Periodização específica para sua data e distância.",
      },
    ],
  },
  {
    kind: "choice",
    icon: <ShieldCheck className="h-6 w-6" />,
    eyebrow: "Pergunta 4 de 5",
    title: "O que mais te impede de começar (ou continuar)?",
    lead:
      "A gente já viu isso mil vezes. Saber qual é o seu freio nos ajuda a destravar.",
    field: "obstacle",
    options: [
      {
        value: "motivation",
        label: "Falta de constância e motivação",
        description: "Começo animado e largo na terceira semana.",
      },
      {
        value: "knowledge",
        label: "Não sei por onde começar",
        description: "Tenho medo de fazer errado, me machucar ou exagerar.",
      },
      {
        value: "injury",
        label: "Tenho ou já tive alguma lesão",
        description: "Joelho, tornozelo, coluna. Preciso de cuidado extra.",
      },
      {
        value: "time",
        label: "Acho que não tenho tempo",
        description: "Trabalho, filhos, casa. O dia some.",
      },
      {
        value: "shame",
        label: "Tenho vergonha de começar",
        description:
          "Acho que estou fora de forma demais para correr na rua.",
      },
    ],
  },
  {
    kind: "form",
    icon: <Sparkles className="h-6 w-6" />,
    eyebrow: "Pergunta 5 de 5",
    title: "Para onde mandamos o seu plano?",
    lead:
      "Um treinador da Passos Verdes vai analisar suas respostas e te chamar no WhatsApp em até 24 horas, com o plano ideal para o seu momento.",
  },
];

const TOTAL = steps.length;

function progressFor(idx: number) {
  return Math.round(((idx + 1) / TOTAL) * 100);
}

function getInitial(): { answers: Answers; done: boolean } {
  if (typeof window === "undefined") return { answers: initialAnswers, done: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: initialAnswers, done: false };
    const parsed = JSON.parse(raw) as { answers?: Answers; done?: boolean };
    return {
      answers: { ...initialAnswers, ...(parsed.answers ?? {}) },
      done: Boolean(parsed.done),
    };
  } catch {
    return { answers: initialAnswers, done: false };
  }
}

type QuestionnaireProps = {
  onComplete: () => void;
};

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const { toast } = useToast();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initial = getInitial();
    if (initial.done) {
      onComplete();
      return;
    }
    setAnswers(initial.answers);
  }, [onComplete]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const step = steps[stepIdx];
  const progress = useMemo(() => progressFor(stepIdx), [stepIdx]);

  const isLast = stepIdx === TOTAL - 1;

  function selectChoice(field: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => {
      if (!isLast) setStepIdx((i) => Math.min(i + 1, TOTAL - 1));
    }, 220);
  }

  function canAdvance(): boolean {
    if (step.kind === "intro") return true;
    if (step.kind === "choice") return Boolean(answers[step.field]);
    if (step.kind === "form") {
      return (
        answers.name.trim().length >= 2 &&
        answers.whatsapp.replace(/\D/g, "").length >= 10 &&
        Number(answers.age) >= 12 &&
        Number(answers.age) <= 90
      );
    }
    return false;
  }

  function next() {
    if (!canAdvance()) return;
    if (stepIdx < TOTAL - 1) setStepIdx((i) => i + 1);
  }

  function back() {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  }

  function submit() {
    if (!canAdvance()) return;
    setSubmitting(true);
    setTimeout(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ answers, done: true, completedAt: Date.now() })
        );
      } catch {
        /* ignore */
      }
      setSubmitting(false);
      toast({
        title: `Plano em construção, ${answers.name.split(" ")[0] || "corredor(a)"}!`,
        description:
          "Recebemos suas respostas. Um treinador vai te chamar no WhatsApp em até 24h com o seu plano personalizado.",
      });
      onComplete();
    }, 1200);
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/30 rounded-full blur-3xl pointer-events-none translate-y-1/4 -translate-x-1/4" />

      <div className="relative min-h-full flex flex-col">
        <header className="px-4 sm:px-6 pt-6 pb-4">
          <div className="container mx-auto max-w-3xl flex items-center gap-3">
            <img
              src={logo}
              alt="Passos Verdes"
              className="h-12 w-auto object-contain"
            />
            <span className="text-base font-extrabold tracking-tight text-foreground">
              Passos<span className="text-primary">Verdes</span>
            </span>
          </div>
        </header>

        <div className="px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
              {progress}% concluído
            </p>
          </div>
        </div>

        <main className="flex-1 px-4 sm:px-6 py-8 md:py-12">
          <div className="container mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-card border border-card-border rounded-3xl shadow-xl p-6 md:p-10"
              >
                <div className="flex items-center gap-3 text-primary mb-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    {step.icon}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {step.eyebrow}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-3">
                  {step.title}
                </h2>

                {("lead" in step && step.lead) && (
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                    {step.lead}
                  </p>
                )}

                {step.kind === "intro" && (
                  <div className="grid sm:grid-cols-3 gap-4 mb-2">
                    {step.bullets.map((b) => (
                      <div
                        key={b.title}
                        className="rounded-2xl bg-accent/30 border border-accent p-4"
                      >
                        <h4 className="font-bold text-foreground mb-1">
                          {b.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {b.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {step.kind === "choice" && (
                  <div className="grid gap-3">
                    {step.options.map((opt) => {
                      const selected = answers[step.field] === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => selectChoice(step.field, opt.value)}
                          className={`text-left w-full rounded-2xl border-2 p-4 md:p-5 transition-all hover-elevate ${
                            selected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-background"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border"
                              }`}
                            >
                              {selected && <CheckCircle2 className="h-4 w-4" />}
                            </span>
                            <div>
                              <p className="font-bold text-foreground text-base md:text-lg leading-snug">
                                {opt.label}
                              </p>
                              {opt.description && (
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                  {opt.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.kind === "form" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Seu nome
                      </label>
                      <Input
                        autoFocus
                        value={answers.name}
                        onChange={(e) =>
                          setAnswers((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Como podemos te chamar?"
                        className="h-12 bg-background"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          WhatsApp
                        </label>
                        <Input
                          type="tel"
                          value={answers.whatsapp}
                          onChange={(e) =>
                            setAnswers((p) => ({
                              ...p,
                              whatsapp: e.target.value,
                            }))
                          }
                          placeholder="(DDD) 90000-0000"
                          className="h-12 bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Idade
                        </label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={answers.age}
                          onChange={(e) =>
                            setAnswers((p) => ({ ...p, age: e.target.value }))
                          }
                          placeholder="Ex: 34"
                          className="h-12 bg-background"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Seus dados são usados apenas para montar o seu plano. Não
                      enviamos spam, não compartilhamos com terceiros.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/60">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={back}
                    disabled={stepIdx === 0 || submitting}
                    className="text-muted-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>

                  {isLast ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={submit}
                      disabled={!canAdvance() || submitting}
                      className="font-bold"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Montando seu plano...
                        </>
                      ) : (
                        <>
                          Receber meu plano
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      onClick={next}
                      disabled={!canAdvance()}
                      className="font-bold"
                    >
                      {step.kind === "intro" ? "Vamos começar" : "Continuar"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="px-4 sm:px-6 pb-6">
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs text-center text-muted-foreground">
              Comunidade Passos Verdes — assessoria de corrida online para todo
              o Brasil.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
