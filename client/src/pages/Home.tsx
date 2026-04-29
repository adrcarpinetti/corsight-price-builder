/*
 * Design: "Command Center" — HUD-inspired dark theme
 * Colors: Navy deep (#0a1628) + Cyan glow (#00d4ff)
 * Typography: Space Grotesk (body) + JetBrains Mono (data/prices)
 * Layout: Sidebar wizard steps + main content area + live summary
 */

import { PricingProvider, usePricing } from '@/contexts/PricingContext';
import StepIndicator from '@/components/StepIndicator';
import LiveSummary from '@/components/LiveSummary';
import Step1Project from '@/components/steps/Step1Project';
import Step2UseCase from '@/components/steps/Step2UseCase';
import Step3Sizing from '@/components/steps/Step3Sizing';
import Step4Database from '@/components/steps/Step4Database';
import Step5Contract from '@/components/steps/Step5Contract';
import Step6Addons from '@/components/steps/Step6Addons';
import Step7Result from '@/components/steps/Step7Result';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/cCNtgpfpLb60cKu6BUH9a2/sandbox/3hlmD0XUTTnJ5HWZfJVjFp-img-1_1770917604000_na1fn_aGVyby1jb3JzaWdodA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvY0NOdGdwZnBMYjYwY0t1NkJVSDlhMi9zYW5kYm94LzNobG1EMFhVVFRuSjVIV1pmSlZqRnAtaW1nLTFfMTc3MDkxNzYwNDAwMF9uYTFmbl9hR1Z5YnkxamIzSnphV2RvZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YNlnZOOAdWEddVoiWi3fYyOkE6iQSvYKDcWRGOHdhUeUSyeFtMBKHsmvoHPirosvZK7fRn-~dVTjhXkK531-RdcQ77gOwHyw6I83v9in7R~hcNdT3a0ONM8C4-qpcWcuvw4ht-132sMmnDDo7ozYLVqHjzM7HJP8dgy7CZKGLEpOlGX1RKEUm5BFqoKaMJ5Go~7l4NMChI3pbtSGvyQXDOL5oK1l~XLdkWj-0NJTWmb4tjB9YnBnvLPf85G6z0HLYmKaIwo8vVbLSXnONiQIK12dOIbudBDdRVrZ4FIslm24S6fUIqw20WJiF8oDG3TgRMjmfSjP6hcXU2a~vC0zqQ__";

const LOGO_MONTREAL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663210594599/usJWriykvimxOPjt.png";
const LOGO_MONTREAL_SMALL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663210594599/dYylxvzaqNmVzdyo.png";

function WelcomeScreen() {
  const { nextStep } = usePricing();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Corsight Fortify Control Room"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container max-w-5xl py-20">
          <div className="flex flex-col items-start gap-8">
            {/* Logos */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-foreground tracking-tight">CORSIGHT</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <img
                src={LOGO_MONTREAL}
                alt="Montreal"
                className="h-10 object-contain invert brightness-200 opacity-90"
              />
            </div>

            {/* Title */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Fortify
                <span className="text-primary text-glow"> Price Builder</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground mt-4 max-w-xl"
              >
                Construtor de preços inteligente para o sistema de reconhecimento facial Corsight Fortify.
                Dimensione hardware, configure licenças e gere propostas detalhadas.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={nextStep}
              className="
                mt-4 px-8 py-4 rounded-lg font-semibold text-lg
                bg-primary text-primary-foreground
                hover:bg-primary/90 transition-all duration-300
                glow-cyan-strong hover:shadow-[0_0_30px_oklch(0.72_0.15_200/0.6)]
                flex items-center gap-3
              "
            >
              <Shield className="w-5 h-5" />
              Iniciar Configuração
            </motion.button>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl"
            >
              {[
                { title: 'Perguntas Guiadas', desc: 'Wizard passo-a-passo com todas as perguntas necessárias' },
                { title: 'Hardware Sizing', desc: 'Dimensionamento automático de servidores e GPUs' },
                { title: 'Preços Detalhados', desc: 'Cálculo em tempo real baseado no Price Book oficial' },
              ].map((f, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-primary mb-1">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-4">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <span>Corsight AI — Fortify Price Book Janeiro 2026 (A)</span>
          <span>Confidencial — Uso interno Montreal</span>
        </div>
      </div>
    </motion.div>
  );
}

function WizardLayout() {
  const { state } = usePricing();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const steps: Record<number, React.ReactNode> = {
    1: <Step1Project />,
    2: <Step2UseCase />,
    3: <Step3Sizing />,
    4: <Step4Database />,
    5: <Step5Contract />,
    6: <Step6Addons />,
    7: <Step7Result />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm text-foreground tracking-tight">CORSIGHT FORTIFY</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-border" />
            <img src={LOGO_MONTREAL_SMALL} alt="Montreal" className="hidden sm:block h-5 object-contain invert brightness-200 opacity-80" />
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            Price Builder v1.0
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col pt-16 lg:pt-0
        `}>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Etapas</h3>
              <StepIndicator />
            </div>
            <div className="mt-6">
              <LiveSummary />
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 lg:p-10">
            <AnimatePresence mode="wait">
              <div key={state.currentStep}>
                {steps[state.currentStep] || <Step1Project />}
              </div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function HomeContent() {
  const { state } = usePricing();

  return (
    <AnimatePresence mode="wait">
      {state.currentStep === 0 ? (
        <WelcomeScreen key="welcome" />
      ) : (
        <WizardLayout key="wizard" />
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <PricingProvider>
      <HomeContent />
    </PricingProvider>
  );
}
