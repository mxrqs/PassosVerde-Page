import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Já sou velho demais para começar a correr?",
    answer: "Definitivamente não. Temos alunos que começaram aos 50, 60 anos. O segredo é ter um método progressivo, que intercala caminhada e corrida, respeitando as articulações e a resposta do seu corpo. A idade é apenas mais um fator que adaptamos na sua planilha."
  },
  {
    question: "Tenho uma lesão antiga, posso fazer a assessoria?",
    answer: "Depende da lesão e da liberação médica. Recomendamos que você tenha o aval do seu ortopedista. Nossa planilha será construída considerando seu histórico, focando em exercícios de fortalecimento e evolução conservadora para não agravar nenhum quadro."
  },
  {
    question: "Não tenho muito tempo livre. Consigo encaixar na rotina?",
    answer: "A falta de tempo é a desculpa de 90% dos nossos novos alunos. A realidade: você precisa de apenas 3 treinos de 30 a 40 minutos por semana. É menos tempo do que você gasta no Instagram. Como a planilha é no app, você faz o treino na hora que puder, onde estiver."
  },
  {
    question: "Funciona mesmo sendo 100% online?",
    answer: "Sim! A assessoria online não é apenas um PDF enviado por email. É acompanhamento constante. Analisamos os dados que você sobe no app (pace, percepção de esforço) e ajustamos a rota. O grupo do WhatsApp traz o senso de pertencimento que muitas vezes falta na corrida solitária."
  },
  {
    question: "E se eu não gostar?",
    answer: "Temos uma garantia incondicional de 7 dias. Você entra, acessa o app, fala com o treinador, recebe a primeira planilha e vê o grupo funcionando. Se achar que não é para você, devolvemos 100% do seu dinheiro sem letras miúdas."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Dúvidas Frequentes</h2>
          <p className="text-lg text-muted-foreground">
            Ainda está inseguro? Respondemos as perguntas mais comuns.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-card-border mb-4 bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}