import { usePricing, CameraResolution } from '@/contexts/PricingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Camera, Monitor, Scan, Users } from 'lucide-react';

export default function Step3Sizing() {
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Dimensionamento</h2>
        <p className="text-muted-foreground">
          {state.licenseType === 'live'
            ? 'Configure as câmeras e parâmetros de processamento.'
            : state.licenseType === 'investigate'
            ? 'Configure as telas de investigação.'
            : 'Configure os parâmetros de matching.'}
        </p>
      </div>

      {state.licenseType === 'live' && (
        <div className="grid gap-6 max-w-lg">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Camera className="w-4 h-4 text-primary" />
              Número de Câmeras
            </Label>
            <Input
              type="number"
              min={1}
              max={10000}
              value={state.numCameras}
              onChange={(e) => updateState({ numCameras: Math.max(1, parseInt(e.target.value) || 1) })}
              className="bg-input border-border h-12 font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Monitor className="w-4 h-4 text-primary" />
              Resolução das Câmeras
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '1920x1080' as CameraResolution, label: '2MP (1080p)' },
                { value: '3840x2160' as CameraResolution, label: '4K (2160p)' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateState({ cameraResolution: opt.value })}
                  className={`
                    p-3 rounded-lg border text-center transition-all duration-300 font-mono text-sm
                    ${state.cameraResolution === opt.value
                      ? 'border-primary bg-primary/10 text-primary glow-cyan'
                      : 'border-border bg-card text-foreground hover:border-primary/40'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4 text-primary" />
              Faces por Stream
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 5, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => updateState({ facesPerStream: n })}
                  className={`
                    p-3 rounded-lg border text-center transition-all duration-300 font-mono
                    ${state.facesPerStream === n
                      ? 'border-primary bg-primary/10 text-primary glow-cyan'
                      : 'border-border bg-card text-foreground hover:border-primary/40'
                    }
                  `}
                >
                  {n} faces
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Número de faces processadas simultaneamente por câmera. Recomendado: 5 para 2MP, 10 para 4K.
            </p>
          </div>
        </div>
      )}

      {state.licenseType === 'investigate' && (
        <div className="grid gap-6 max-w-lg">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Scan className="w-4 h-4 text-primary" />
              Número de Licenças Investigate
            </Label>
            <Input
              type="number"
              min={1}
              max={100}
              value={state.numScreens}
              onChange={(e) => updateState({ numScreens: Math.max(1, parseInt(e.target.value) || 1) })}
              className="bg-input border-border h-12 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Cada licença inclui uma base de dados de 2.000 imagens.
            </p>
          </div>
        </div>
      )}

      {state.licenseType === 'matching' && (
        <div className="grid gap-6 max-w-lg">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Scan className="w-4 h-4 text-primary" />
              Número de Identificações Esperadas
            </Label>
            <Input
              type="number"
              min={100}
              value={state.numIdentifications}
              onChange={(e) => updateState({ numIdentifications: Math.max(100, parseInt(e.target.value) || 100) })}
              className="bg-input border-border h-12 font-mono"
            />
          </div>
        </div>
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
