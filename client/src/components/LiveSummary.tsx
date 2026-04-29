import { usePricing } from '@/contexts/PricingContext';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { formatCurrency } from '@/lib/pricingData';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Server, Camera, Database, TrendingUp, Plug, HardDrive } from 'lucide-react';

function SummaryLine({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  if (value === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center justify-between text-xs py-0.5"
    >
      <span className="text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className="font-mono text-foreground">{formatCurrency(value)}</span>
    </motion.div>
  );
}

export default function LiveSummary() {
  const { state } = usePricing();
  const calc = usePriceCalculation();

  if (state.currentStep === 0) return null;

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <TrendingUp className="w-4 h-4" />
        <h3 className="text-xs font-semibold uppercase tracking-wider">Resumo em Tempo Real</h3>
      </div>

      <div className="space-y-1">
        <AnimatePresence mode="popLayout">
          <SummaryLine
            key="cameras"
            label={`${state.numCameras} câmeras`}
            value={calc.cameraLicenses}
            icon={<Camera className="w-3 h-3" />}
          />
          <SummaryLine
            key="db"
            label="Base de dados"
            value={calc.imageDbExpansion}
            icon={<Database className="w-3 h-3" />}
          />
          <SummaryLine
            key="investigate"
            label="Investigate"
            value={calc.investigateLicense}
            icon={<Server className="w-3 h-3" />}
          />
          <SummaryLine
            key="historyDb"
            label="DB Histórica"
            value={calc.historyDb}
            icon={<HardDrive className="w-3 h-3" />}
          />
          <SummaryLine
            key="users"
            label="Usuários"
            value={calc.additionalUsers}
          />
          <SummaryLine
            key="insights"
            label="Insights"
            value={calc.insights}
          />
          <SummaryLine
            key="agegender"
            label="Idade & Gênero"
            value={calc.ageGender}
          />
          <SummaryLine
            key="vms"
            label="VMS"
            value={calc.vmsIntegrationCameras + calc.vmsIntegrationSites}
            icon={<Plug className="w-3 h-3" />}
          />
          <SummaryLine
            key="distributed"
            label="Distribuído"
            value={calc.distributedSystem}
          />
          <SummaryLine
            key="services"
            label="Serviços"
            value={calc.professionalServices}
          />
        </AnimatePresence>
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <DollarSign className="w-3 h-3 text-primary" />
            Total ({calc.termLabel})
          </span>
          <motion.span
            key={calc.total}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className="font-mono font-bold text-lg text-primary"
          >
            {formatCurrency(calc.total)}
          </motion.span>
        </div>
        {calc.termMultiplier > 1 && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">Custo anual</span>
            <span className="font-mono text-xs text-primary/80">{formatCurrency(calc.annualRecurring)}/ano</span>
          </div>
        )}
      </div>

      {calc.hardwareRecommendations.length > 0 && state.currentStep >= 3 && (
        <div className="border-t border-border pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Server className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground">Hardware Recomendado</span>
          </div>
          <div className="text-xs text-foreground/80">
            <span className="font-mono text-primary">{calc.hardwareRecommendations[0]?.serversNeeded}x</span>{' '}
            {calc.hardwareRecommendations[0]?.hardware.name}
          </div>
        </div>
      )}
    </div>
  );
}
