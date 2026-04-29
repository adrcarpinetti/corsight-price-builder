import { usePricing, LicenseType, UseCase } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Video, Search, MonitorPlay, Shield, UserCheck } from 'lucide-react';

const licenseOptions: { value: LicenseType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'live',
    label: 'Live (Tempo Real)',
    desc: 'Monitoramento em tempo real com câmeras de vigilância',
    icon: <Video className="w-6 h-6" />,
  },
  {
    value: 'investigate',
    label: 'Investigate (Forense)',
    desc: 'Análise forense de vídeos offline',
    icon: <Search className="w-6 h-6" />,
  },
  {
    value: 'matching',
    label: 'Matching Engine (1:N)',
    desc: 'Busca de imagens contra base de dados',
    icon: <MonitorPlay className="w-6 h-6" />,
  },
];

const useCaseOptions: { value: UseCase; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'interest',
    label: 'Interest List',
    desc: 'Monitorar indivíduos que estão nas Watchlists',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    value: 'authorised',
    label: 'Authorised List',
    desc: 'Monitorar indivíduos que NÃO estão nas Watchlists (maior demanda de processamento)',
    icon: <UserCheck className="w-5 h-5" />,
  },
];

export default function Step2UseCase() {
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Caso de Uso</h2>
        <p className="text-muted-foreground">Selecione o tipo de licença e o caso de uso do sistema.</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Tipo de Licença</h3>
        <div className="grid gap-3">
          {licenseOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateState({ licenseType: opt.value })}
              className={`
                flex items-center gap-4 p-4 rounded-lg border text-left transition-all duration-300
                ${state.licenseType === opt.value
                  ? 'border-primary bg-primary/10 glow-cyan'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-card/80'
                }
              `}
            >
              <div className={`
                p-2 rounded-md transition-colors
                ${state.licenseType === opt.value ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}
              `}>
                {opt.icon}
              </div>
              <div>
                <div className={`font-semibold ${state.licenseType === opt.value ? 'text-primary' : 'text-foreground'}`}>
                  {opt.label}
                </div>
                <div className="text-sm text-muted-foreground">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {state.licenseType === 'live' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Tipo de Watchlist</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCaseOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateState({ useCase: opt.value })}
                className={`
                  flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-300
                  ${state.useCase === opt.value
                    ? 'border-primary bg-primary/10 glow-cyan'
                    : 'border-border bg-card hover:border-primary/40'
                  }
                `}
              >
                <div className={`
                  p-1.5 rounded-md mt-0.5
                  ${state.useCase === opt.value ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}
                `}>
                  {opt.icon}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${state.useCase === opt.value ? 'text-primary' : 'text-foreground'}`}>
                    {opt.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

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
