import { motion } from "framer-motion";
import { Activity, BatteryWarning, HeartPulse } from "lucide-react";
import tiredPersonImg from "@/assets/tired-person.png";

export function PainPoints() {
  return (
    <section className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img 
                src={tiredPersonImg} 
                alt="Pessoa cansada após tentar exercício" 
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating stats card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:-right-12 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl max-w-xs border border-primary-foreground/20"
            >
              <p className="font-semibold text-lg mb-2">"Será que eu consigo?"</p>
              <p className="text-sm opacity-90">Essa é a frase que mais ouvimos de quem chega até nós. E a resposta é sim.</p>
            </motion.div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Você cansa subindo um lance de escada? <span className="text-secondary">Seu corpo está pedindo socorro.</span>
              </h2>
              <p className="text-lg text-background/80 mb-10">
                Sabemos como é o ciclo: você decide que vai mudar de vida, paga meses adiantados de uma academia que não gosta, vai por duas semanas, sente dores, se desmotiva e desiste. A culpa não é sua. O método tradicional não foi feito para quem está começando.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  icon: <BatteryWarning className="h-6 w-6 text-secondary" />,
                  title: "Cansaço constante e falta de energia",
                  desc: "Trabalhar o dia todo sentado drena sua energia vital. O sedentarismo não te faz descansar, ele te deixa mais exausto."
                },
                {
                  icon: <HeartPulse className="h-6 w-6 text-secondary" />,
                  title: "O corpo enferrujado",
                  desc: "Dores nas costas, má postura, joelhos estalando. O corpo humano foi desenhado para o movimento."
                },
                {
                  icon: <Activity className="h-6 w-6 text-secondary" />,
                  title: "A ansiedade cobrando a conta",
                  desc: "A corrida não é apenas sobre o corpo, é a melhor válvula de escape para o estresse do dia a dia."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                    <p className="text-background/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}