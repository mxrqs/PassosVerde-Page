import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Desafio 5km",
    description: "Para quem quer dar o primeiro passo",
    price: "47",
    period: "pagamento único",
    features: [
      "Planilha fechada de 8 semanas",
      "Acesso à comunidade por 21 dias",
      "Dicas e educativos em vídeo",
      "Suporte básico"
    ],
    highlight: false,
    cta: "Começar o Desafio"
  },
  {
    name: "Comunidade Passos Verdes",
    description: "O plano mais escolhido pelos alunos",
    price: "197",
    period: "por mês",
    features: [
      "Planilha 100% personalizada",
      "App de treino exclusivo",
      "Acesso ao grupo VIP no WhatsApp",
      "Check-in semanal com treinador",
      "Ajustes ilimitados na planilha",
      "Participação em rankings e premiações",
      "Novo objetivo a cada mês"
    ],
    highlight: true,
    cta: "Assinar Comunidade"
  },
  {
    name: "Mentoria Premium VIP",
    description: "Acompanhamento de elite, 1 para 1",
    price: "997",
    period: "por mês",
    features: [
      "Tudo da Comunidade",
      "Treinador dedicado exclusico",
      "Call mensal de alinhamento 1:1",
      "Acompanhamento nutricional parceiro",
      "Análise de biomecânica por vídeo",
      "Preparação para provas oficiais"
    ],
    highlight: false,
    cta: "Aplicar para Mentoria"
  }
];

export function Pricing() {
  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Invista na sua saúde</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta ao seu momento e comprometa-se com a sua transformação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-card rounded-3xl p-8 relative border ${
                plan.highlight 
                  ? 'border-primary shadow-xl md:scale-105 z-10' 
                  : 'border-card-border shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MAIS RECOMENDADO
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
              </div>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">R$</span>
                <span className="text-5xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/{plan.period}</span>
              </div>
              
              <Button 
                onClick={scrollToForm}
                variant={plan.highlight ? 'default' : 'outline'} 
                className={`w-full mb-8 h-12 text-base font-bold ${plan.highlight ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : ''}`}
              >
                {plan.cta}
              </Button>
              
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground mt-12 text-sm">
          * A Comunidade Passos Verdes possui plano anual com desconto. Consulte as opções com nosso time.
        </p>
      </div>
    </section>
  );
}