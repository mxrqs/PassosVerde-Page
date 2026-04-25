import { motion } from "framer-motion";
import { Trophy, MapPin, Target } from "lucide-react";
import communityImg from "@/assets/community-finish.png";

export function Community() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              A força do grupo faz você ir mais longe.
            </h2>
            <p className="text-lg text-background/80 mb-8">
              A Passos Verdes é uma comunidade 100% online, mas com calor humano. Conectamos pessoas do Brasil inteiro que compartilham das mesmas dores e das mesmas vitórias.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Nacional e Acessível</h4>
                  <p className="text-background/70">Não importa de qual cidade você é. A assessoria vai com você no celular para o parque, rua ou esteira.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Gamificação e Prêmios</h4>
                  <p className="text-background/70">Ranking semanal amigável. Atingiu a meta? Subiu de nível? Você ganha reconhecimento no grupo e concorre a mimos reais.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Novos Objetivos Sempre</h4>
                  <p className="text-background/70">Concluiu os 5km? Ótimo! No próximo mês vamos focar em melhorar seu tempo, perder peso ou buscar os 10km. A jornada não para.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src={communityImg} 
                alt="Grupo celebrando conquista na corrida" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
            
            {/* Fake WhatsApp message popups */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute top-10 -left-6 md:-left-12 bg-background text-foreground p-4 rounded-2xl rounded-tl-sm shadow-xl max-w-[240px]"
            >
              <p className="text-sm font-semibold mb-1">Thiago Treinador</p>
              <p className="text-sm">Time, bora pra rua! Quem já fez o treino de hoje manda a foto! 🏃‍♂️💚</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-20 -right-6 md:-right-12 bg-background text-foreground p-4 rounded-2xl rounded-br-sm shadow-xl max-w-[240px]"
            >
              <p className="text-sm font-semibold mb-1 text-secondary">Camila (São Paulo)</p>
              <p className="text-sm">Feitooo! Primeira vez que corro 3km sem parar. Não tô acreditando!</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}