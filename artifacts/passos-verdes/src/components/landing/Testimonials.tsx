import { motion } from "framer-motion";
import { Star } from "lucide-react";
import heroRunners from "@/assets/hero-runners.png";

const testimonials = [
  {
    name: "Marina S.",
    age: 34,
    text: "Sempre odiei academia. Achava que corrida era só para gente magra e fit. A comunidade da Passos Verdes me abraçou. Perdi 8kg em 12 semanas e não me sinto mais esgotada no fim do dia de trabalho.",
    img: "https://i.pravatar.cc/150?img=9"
  },
  {
    name: "Carlos T.",
    age: 42,
    text: "Meu joelho doía só de pensar em correr. Com a planilha adaptada, fui evoluindo aos poucos. Hoje corro meus 5km sorrindo e o melhor: sem dor nenhuma. A assessoria online funciona muito bem.",
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Amanda R.",
    age: 28,
    text: "O que me prendeu foi o grupo do WhatsApp. Ver gente normal do Brasil inteiro acordando cedo para correr me motivou demais. Consegui baixar meu pace e já estou focando nos 10km!",
    img: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Rodrigo M.",
    age: 39,
    text: "Eu não conseguia brincar com meus filhos sem ficar sem ar. O desafio de 8 semanas mudou minha vida. O treinador sempre atento no WhatsApp fez toda a diferença para eu não desistir na terceira semana.",
    img: "https://i.pravatar.cc/150?img=12"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pessoas reais, histórias reais</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa comunidade é formada por gente como você, que decidiu dar o primeiro passo em direção a uma vida mais ativa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-6 rounded-2xl shadow-sm border border-card-border"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.age} anos</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed italic">"{t.text}"</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] w-full max-w-5xl mx-auto"
        >
          <img 
            src={heroRunners} 
            alt="Comunidade Passos Verdes correndo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex items-end p-8 md:p-12">
            <h3 className="text-background text-2xl md:text-4xl font-bold max-w-2xl">
              Mais de 1.000 pessoas já calçaram o tênis e começaram. Agora é a sua vez.
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}