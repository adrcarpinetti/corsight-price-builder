import { usePricing } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, FolderOpen } from 'lucide-react';

export default function Step1Project() {
  const { state, updateState, nextStep } = usePricing();

  const canProceed = state.clientName.trim().length > 0 && state.projectName.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Informações do Projeto</h2>
        <p className="text-muted-foreground">Identifique o cliente e o projeto para gerar a proposta.</p>
      </div>

      <div className="grid gap-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="clientName" className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="w-4 h-4 text-primary" />
            Nome do Cliente
          </Label>
          <Input
            id="clientName"
            value={state.clientName}
            onChange={(e) => updateState({ clientName: e.target.value })}
            placeholder="Ex: Empresa ABC Ltda"
            className="bg-input border-border focus:border-primary focus:ring-primary/20 h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectName" className="flex items-center gap-2 text-sm font-medium">
            <FolderOpen className="w-4 h-4 text-primary" />
            Nome do Projeto
          </Label>
          <Input
            id="projectName"
            value={state.projectName}
            onChange={(e) => updateState({ projectName: e.target.value })}
            placeholder="Ex: Segurança Aeroporto GRU"
            className="bg-input border-border focus:border-primary focus:ring-primary/20 h-12"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
