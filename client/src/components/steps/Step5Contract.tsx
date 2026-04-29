import { usePricing, ContractTerm, Architecture } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, Users, Network, Cloud, Server } from 'lucide-react';

const termOptions: { value: ContractTerm; label: string; desc: string }[] = [
  { value: 'annual', label: 'Anual', desc: 'Renovação anual' },
  { value: 'threeYear', label: '3 Anos', desc: 'Desconto por compromisso' },
  { value: 'fiveYear', label: '5 Anos', desc: 'Maior desconto' },
];

export default function Step5Contract() {
  const { state, updateState, nextStep, prevStep } = usePricing();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Contrato & Configuração</h2>
        <p className="text-muted-foreground">Defina o prazo do contrato, usuários e arquitetura do sistema.</p>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          Prazo do Contrato
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {termOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateState({ contractTerm: opt.value })}
              className={`
                p-4 rounded-lg border text-center transition-all duration-300
                ${state.contractTerm === opt.value
                  ? 'border-primary bg-primary/10 glow-cyan'
                  : 'border-border bg-card hover:border-primary/40'
                }
              `}
            >
              <div className={`font-bold ${state.contractTerm === opt.value ? 'text-primary' : 'text-foreground'}`}>
                {opt.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Users className="w-4 h-4 text-primary" />
          Usuários Adicionais
        </Label>
        <Input
          type="number"
          min={0}
          max={1000}
          value={state.additionalUsers}
          onChange={(e) => updateState({ additionalUsers: Math.max(0, parseInt(e.target.value) || 0) })}
          className="bg-input border-border h-12 font-mono max-w-xs"
        />
        <p className="text-xs text-muted-foreground">
          Cada usuário adicional custa $100/ano. O sistema já inclui 1 usuário padrão.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Network className="w-4 h-4 text-primary" />
          Arquitetura
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'centralized' as Architecture, label: 'Centralizada', icon: <Server className="w-5 h-5" />, desc: 'Sistema único centralizado' },
            { value: 'distributed' as Architecture, label: 'Distribuída', icon: <Network className="w-5 h-5" />, desc: 'Múltiplos sites (+30% do custo)' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateState({ architecture: opt.value })}
              className={`
                flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-300
                ${state.architecture === opt.value
                  ? 'border-primary bg-primary/10 glow-cyan'
                  : 'border-border bg-card hover:border-primary/40'
                }
              `}
            >
              <div className={`p-1.5 rounded-md ${state.architecture === opt.value ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                {opt.icon}
              </div>
              <div>
                <div className={`font-semibold text-sm ${state.architecture === opt.value ? 'text-primary' : 'text-foreground'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Cloud className="w-4 h-4 text-primary" />
          Tipo de Implantação
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'onpremises' as const, label: 'On-Premises', desc: 'Infraestrutura local' },
            { value: 'cloud' as const, label: 'Nuvem', desc: 'Infraestrutura em nuvem' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateState({ deploymentType: opt.value })}
              className={`
                p-4 rounded-lg border text-center transition-all duration-300
                ${state.deploymentType === opt.value
                  ? 'border-primary bg-primary/10 glow-cyan'
                  : 'border-border bg-card hover:border-primary/40'
                }
              `}
            >
              <div className={`font-semibold text-sm ${state.deploymentType === opt.value ? 'text-primary' : 'text-foreground'}`}>
                {opt.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={prevStep} variant="outline" className="gap-2 h-12 px-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
