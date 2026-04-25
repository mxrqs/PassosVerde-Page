import logo from "@/assets/logo-passos-verdes.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/60 py-12 border-t border-background/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Passos Verdes"
                className="h-14 w-auto object-contain"
              />
              <h4 className="text-2xl font-extrabold text-background tracking-tight">
                Passos<span className="text-primary">Verdes</span>
              </h4>
            </div>
            <p className="max-w-sm mb-6">
              A assessoria de corrida online que transforma sedentários em corredores, respeitando o ritmo e a realidade do brasileiro.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-background mb-4">Links</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-background transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Depoimentos</a></li>
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-background mb-4">Contato</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-background transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-background transition-colors">contato@passosverdes.com.br</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Passos Verdes Assessoria Esportiva. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-background transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-background transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}