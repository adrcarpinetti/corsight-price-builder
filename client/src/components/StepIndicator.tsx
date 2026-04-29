import { usePricing } from '@/contexts/PricingContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { label: 'Projeto', icon: '01' },
  { label: 'Caso de Uso', icon: '02' },
  { label: 'Dimensionamento', icon: '03' },
  { label: 'Base de Dados', icon: '04' },
  { label: 'Contrato', icon: '05' },
  { label: 'Add-ons', icon: '06' },
  { label: 'Resultado', icon: '07' },
];

export default function StepIndicator() {
  const { state, goToStep } = usePricing();

  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, index) => {
        const stepNumber = index + 1; // Steps are 1-indexed (currentStep 1..7)
        const isActive = state.currentStep === stepNumber;
        const isCompleted = state.currentStep > stepNumber;
        const isClickable = stepNumber <= state.currentStep;

        return (
          <button
            key={index}
            onClick={() => isClickable && goToStep(stepNumber)}
            disabled={!isClickable}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300
              ${isActive ? 'bg-primary/15 glow-cyan' : ''}
              ${isCompleted ? 'opacity-80' : ''}
              ${!isClickable ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary/10'}
            `}
          >
            <div className={`
              w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono font-bold
              transition-all duration-300 shrink-0
              ${isActive ? 'bg-primary text-primary-foreground glow-cyan-strong' : ''}
              ${isCompleted ? 'bg-primary/30 text-primary' : ''}
              ${!isActive && !isCompleted ? 'bg-secondary text-muted-foreground border border-border' : ''}
            `}>
              {isCompleted ? <Check className="w-4 h-4" /> : step.icon}
            </div>

            <span className={`
              text-sm font-medium transition-colors duration-300
              ${isActive ? 'text-primary text-glow' : ''}
              ${isCompleted ? 'text-foreground/70' : 'text-muted-foreground'}
            `}>
              {step.label}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeStep"
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
