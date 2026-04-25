import { motion } from "framer-motion";
import { NextStepCard } from "./NextStepCard";

export function FinalCTA() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-2xl overflow-hidden border border-card-border/50">
          <div className="grid md:grid-cols-2">
            
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-accent/30">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  O tempo vai passar de qualquer jeito.
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Daqui a 8 semanas você pode continuar cansando ao subir a escada, ou pode estar cruzando a linha de chegada dos seus primeiros 5km. A escolha começa agora.
                </p>
                <div className="space-y-3 font-medium text-foreground">
                  <p>✓ Garantia de 7 dias</p>
                  <p>✓ Acesso imediato à comunidade</p>
                  <p>✓ Planilha pronta hoje mesmo</p>
                </div>
              </motion.div>
            </div>

            <div className="p-8 md:p-12 bg-card border-l border-card-border/50 flex items-center">
              <NextStepCard
                title="Tudo pronto pra começar."
                description="Já temos suas respostas. Agora é só escolher o nível de acompanhamento — entre na comunidade hoje mesmo e receba sua primeira planilha em até 24h."
                primaryLabel="Escolher meu plano"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}