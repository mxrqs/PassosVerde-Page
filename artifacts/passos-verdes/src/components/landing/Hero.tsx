import { motion } from "framer-motion";
import { LeadForm } from "./LeadForm";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-2/3 h-2/3 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              Assessoria de corrida online para iniciantes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
              Saia do sedentarismo e corra seus primeiros <span className="text-primary">5km em 8 semanas</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Sem cobranças irreais, sem pressa. Uma comunidade que entende o seu ritmo e não te deixa desistir no meio do caminho.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium text-foreground mb-10">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-background overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=1" alt="Aluno" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-background overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Aluna" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-background overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=8" alt="Aluno" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs border-2 border-background">
                  +1k
                </div>
              </div>
              <p>Mais de 1.000 alunos transformados.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div id="inscricao" className="bg-card rounded-2xl shadow-xl border border-card-border p-6 md:p-8 max-w-md mx-auto lg:ml-auto relative z-10 scroll-mt-24">
              <h3 className="text-2xl font-bold text-foreground mb-2">Dê o primeiro passo</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Preencha seus dados e nossa equipe montará o melhor plano para o seu momento atual.
              </p>
              <LeadForm />
            </div>
            
            {/* Subtle image peeking behind the form */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/30 rounded-full blur-2xl z-0" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}