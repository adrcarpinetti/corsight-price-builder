import { usePricing } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Database, HardDrive } from 'lucide-react';

const dbSizeOptions = [
  { value: 2000, label: '2.000', desc: 'Incluído na licença' },
  { value: 10000, label: '10.000', desc: '' },
  { value: 50000, label: '50.000', desc: '' },
  { value: 100000, label: '100.000', desc: '' },
  { value: 500000, label: '500.000', desc: '' },
  { value: 1000000, label: '1.000.000', desc: '' },
  { value: 5000000, label: '5.000.000', desc: '' },
  { value: 10000000, label: '10.000.000', desc: '' },
];

const historyDbOptions = [
  { value: 1000000, label: 'Até 1M' },
  { value: 5000000, label: 'Até 5M' },
  { value: 10000000, label: 'Até 10M' },
];

export default function Step4Database() {
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Base de Dados</h2>
        <p className="text-muted-foreground">Configure o tamanho da base de dados de imagens para reconhecimento.</p>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Database className="w-4 h-4 text-primary" />
          Tamanho da Base de Dados (imagens)
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dbSizeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateState({ databaseSize: opt.value })}
              className={`
                p-3 rounded-lg border text-center transition-all duration-300
                ${state.databaseSize === opt.value
                  ? 'border-primary bg-primary/10 glow-cyan'
                  : 'border-border bg-card hover:border-primary/40'
                }
              `}
            >
              <div className={`font-mono font-bold text-sm ${state.databaseSize === opt.value ? 'text-primary' : 'text-foreground'}`}>
                {opt.label}
              </div>
              {opt.desc && <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Base de Dados Histórica (Enterprise)</Label>
          </div>
          <Switch
            checked={state.needsHistoryDb}
            onCheckedChange={(checked) => updateState({
              needsHistoryDb: checked,
              historyDbSize: checked ? 1000000 : 0
            })}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Extensão de base de dados histórica para armazenamento de longo prazo.
        </p>

        {state.needsHistoryDb && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-3 gap-3"
          >
            {historyDbOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateState({ historyDbSize: opt.value })}
                className={`
                  p-3 rounded-lg border text-center transition-all duration-300 font-mono text-sm
                  ${state.historyDbSize === opt.value
                    ? 'border-primary bg-primary/10 text-primary glow-cyan'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
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
