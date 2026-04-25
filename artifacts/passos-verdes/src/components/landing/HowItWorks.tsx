import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      week: "Semanas 1-2",
      title: "Despertar do Corpo",
      desc: "Começamos devagar. Uma mistura de caminhada leve e trotes curtos. Seu coração e pulmões começam a entender a nova rotina sem sofrimento exagerado."
    },
    {
      week: "Semanas 3-4",
      title: "Construindo o Fôlego",
      desc: "Os intervalos de corrida aumentam, a caminhada diminui. Você percebe que não está tão ofegante quanto antes. A endorfina começa a agir."
    },
    {
      week: "Semanas 5-6",
      title: "Resistência Base",
      desc: "Neste ponto, correr já se tornou um hábito. Você já consegue manter um trote contínuo por mais tempo e seu corpo pede pelo treino."
    },
    {
      week: "Semanas 7-8",
      title: "A Linha de Chegada",
      desc: "O corpo e a mente estão alinhados. O que antes parecia impossível acontece: você conclui seus primeiros 5km contínuos com um sorriso no rosto."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-accent/20 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">A Jornada dos 5km</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Esqueça aquele professor que grita no seu ouvido. Nosso método respeita o seu tempo e adapta-se à sua realidade.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-card-border relative">
                      {/* Step dot */}
                      <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary border-4 border-background items-center justify-center text-primary-foreground font-bold z-10 ${isEven ? '-left-5 -translate-x-full' : '-right-5 translate-x-full'}`}>
                        {index + 1}
                      </div>
                      
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-lg mb-3">
                        {step.week}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Empty div for layout balance on desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">O que você recebe ao entrar?</h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mt-8">
            {[
              "Planilha adaptativa pelo app",
              "Acesso ao grupo da comunidade",
              "Check-in e ajustes semanais",
              "Vídeos de técnica e educativos",
              "Ranking e gamificação",
              "Suporte humano via WhatsApp"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}