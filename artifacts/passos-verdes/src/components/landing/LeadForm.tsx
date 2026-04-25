import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(50, "Nome muito longo"),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(15, "WhatsApp inválido"),
  age: z.string().min(1, "Idade é obrigatória"),
  goal: z.string().min(1, "Selecione um objetivo"),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      age: "",
      goal: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // Fake API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Tudo pronto!",
        description: "Recebemos seus dados. Um treinador da Passos Verdes vai te chamar no WhatsApp em breve.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Como gosta de ser chamado?" className="bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(DD) 90000-0000" className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Idade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 34" className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Qual seu principal objetivo hoje?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zero_to_5k">Sair do zero e correr 5km</SelectItem>
                    <SelectItem value="weight_loss">Emagrecer com saúde</SelectItem>
                    <SelectItem value="improve_pace">Já corro, quero melhorar meu tempo</SelectItem>
                    <SelectItem value="health">Ter mais disposição e saúde</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            "Quero começar a correr"
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Seus dados estão seguros. Não enviamos spam.
        </p>
      </form>
    </Form>
  );
}