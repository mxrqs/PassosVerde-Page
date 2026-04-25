import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Flame,
  Moon,
  Smile,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Coração mais forte",
    body:
      "30 minutos de corrida por semana já reduzem em até 30% o risco de doenças cardiovasculares. Seu coração bombeia melhor, sua pressão estabiliza.",
  },
  {
    icon: Flame,
    title: "Queima calórica real",
    body:
      "Correr é uma das atividades que mais gasta calorias por minuto. Com constância, vem a perda de peso saudável — sem dietas malucas.",
  },
  {
    icon: Brain,
    title: "Cabeça mais leve",
    body:
      "A corrida libera endorfina e serotonina. Estudos mostram redução de até 47% nos sintomas de ansiedade e depressão em quem corre regularmente.",
  },
  {
    icon: Moon,
    title: "Sono profundo de verdade",
    body:
      "Quem corre dorme melhor e acorda mais disposto. O corpo cansado bem é o corpo que descansa de verdade.",
  },
  {
    icon: Smile,
    title: "Autoestima reconstruída",
    body:
      "Cada quilômetro vencido é uma prova pra você mesmo de que você consegue. Essa sensação não cabe em nenhuma promoção de academia.",
  },
  {
    icon: ShieldCheck,
    title: "Imunidade reforçada",
    body:
      "A prática regular de exercícios aeróbicos fortalece o sistema imunológico, reduz inflamações e te deixa menos vulnerável a doenças.",
  },
];

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="py-24 bg-background scroll-mt-24 relative overflow-hidden"
    >
      <div className="absolute -top-32 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Por que correr muda tudo
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Não é só sobre perder peso.
            <br />
            <span className="text-primary">É sobre reaprender a viver.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            O sedentarismo é o cigarro silencioso do nosso tempo. Mata devagar,
            piora o humor, rouba a disposição. A boa notícia: o antídoto é
            barato, está debaixo dos seus pés, e você pode começar amanhã de
            manhã. A ciência da corrida é simples — quem corre, vive melhor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-2xl bg-card border border-card-border p-7 hover-elevate"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-5">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {b.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl bg-foreground text-background p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              O dado que ninguém te conta
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-4">
              Quem corre regularmente vive, em média, 3 anos a mais — e com mais
              qualidade nesses anos extras.
            </h3>
            <p className="text-base md:text-lg text-background/70 leading-relaxed">
              Fonte: estudos do British Journal of Sports Medicine. Não é sobre
              virar atleta. É sobre dar ao seu corpo o que ele foi feito pra
              fazer: se mover. A Passos Verdes existe pra te levar por essa
              transformação, no seu ritmo, com gente do seu lado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
