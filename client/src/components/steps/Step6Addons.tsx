import { usePricing } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, BarChart3, UserSearch, Plug, Wrench, BookOpen } from 'lucide-react';

export default function Step6Addons() {
  const { state, updateState, nextStep, prevStep } = usePricing();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Add-ons & Serviços</h2>
        <p className="text-muted-foreground">Selecione módulos adicionais e serviços profissionais.</p>
      </div>

      {/* Insights */}
      <div className="p-4 rounded-lg border border-border bg-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Real-Time Insights</div>
              <div className="text-xs text-muted-foreground">Análise em tempo real — 30% do custo total de licenças</div>
            </div>
          </div>
          <Switch
            checked={state.needsInsights}
            onCheckedChange={(checked) => updateState({ needsInsights: checked })}
          />
        </div>
      </div>

      {/* Age & Gender */}
      <div className="p-4 rounded-lg border border-border bg-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary">
              <UserSearch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Estimativa de Idade & Gênero</div>
              <div className="text-xs text-muted-foreground">Add-on de estimativa — 10% do custo total de licenças</div>
            </div>
          </div>
          <Switch
            checked={state.needsAgeGender}
            onCheckedChange={(checked) => updateState({ needsAgeGender: checked })}
          />
        </div>
      </div>

      {/* VMS Integration */}
      <div className="p-4 rounded-lg border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary">
              <Plug className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Integração VMS (Milestone/Genetec)</div>
              <div className="text-xs text-muted-foreground">Integração com sistema de gerenciamento de vídeo</div>
            </div>
          </div>
          <Switch
            checked={state.needsVmsIntegration}
            onCheckedChange={(checked) => updateState({ needsVmsIntegration: checked })}
          />
        </div>

        {state.needsVmsIntegration && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3 pt-2 border-t border-border"
          >
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Tipo de VMS</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Milestone', 'Genetec'].map((vms) => (
                  <button
                    key={vms}
                    onClick={() => updateState({ vmsType: vms })}
                    className={`
                      p-2 rounded-md border text-sm transition-all
                      ${state.vmsType === vms
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-secondary text-foreground hover:border-primary/40'
                      }
                    `}
                  >
                    {vms}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Número de Sites</Label>
              <Input
                type="number"
                min={1}
                max={200}
                value={state.numSites}
                onChange={(e) => updateState({ numSites: Math.max(1, parseInt(e.target.value) || 1) })}
                className="bg-input border-border h-10 font-mono max-w-[200px]"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Professional Services */}
      <div className="p-4 rounded-lg border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Serviços Profissionais</div>
              <div className="text-xs text-muted-foreground">Instalação, suporte, treinamento — $1.600/dia (não inclui viagem)</div>
            </div>
          </div>
          <Switch
            checked={state.needsProfessionalServices}
            onCheckedChange={(checked) => updateState({ needsProfessionalServices: checked })}
          />
        </div>

        {state.needsProfessionalServices && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-2 border-t border-border"
          >
            <Label className="text-xs text-muted-foreground">Dias de Serviço</Label>
            <Input
              type="number"
              min={1}
              max={365}
              value={state.serviceDays}
              onChange={(e) => updateState({ serviceDays: Math.max(1, parseInt(e.target.value) || 1) })}
              className="bg-input border-border h-10 font-mono max-w-[200px] mt-2"
            />
          </motion.div>
        )}
      </div>

      {/* Case Study */}
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Case Study</div>
              <div className="text-xs text-muted-foreground">O cliente está aberto para um case study?</div>
            </div>
          </div>
          <Switch
            checked={state.openToCaseStudy}
            onCheckedChange={(checked) => updateState({ openToCaseStudy: checked })}
          />
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
          Ver Resultado
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
