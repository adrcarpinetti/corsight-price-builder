import { usePricing } from '@/contexts/PricingContext';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { formatCurrency, formatNumber, investigateServer, imageProcessingServers } from '@/lib/pricingData';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, RotateCcw, Cpu, HardDrive, MonitorSpeaker,
  DollarSign, FileText, Camera, Database, BarChart3, UserSearch,
  Plug, Wrench, Network, Server, Users, Calendar, Shield, ChevronDown, ChevronUp,
  Printer, Clock, MapPin, Cloud
} from 'lucide-react';
import { useState } from 'react';

function LineItem({ icon, label, value, sub, highlight = false }: {
  icon: React.ReactNode; label: string; value: number; sub?: string; highlight?: boolean;
}) {
  if (value === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between py-3 px-4 rounded-md ${highlight ? 'bg-primary/10 border border-primary/30' : 'hover:bg-secondary/50'}`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <div>
          <span className={`text-sm ${highlight ? 'font-bold text-primary' : 'text-foreground/80'}`}>{label}</span>
          {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
        </div>
      </div>
      <span className={`font-mono font-semibold text-sm ${highlight ? 'text-primary text-glow text-lg' : 'text-foreground'}`}>
        {formatCurrency(value)}
      </span>
    </motion.div>
  );
}

export default function Step7Result() {
  const { state, prevStep, resetState } = usePricing();
  const calc = usePriceCalculation();
  const [showHwDetails, setShowHwDetails] = useState(true);

  const handleExportPDF = () => {
    window.print();
  };

  const handleNewQuote = () => {
    resetState();
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Proposta de Preços</h2>
          <p className="text-muted-foreground text-sm">
            {state.clientName} — {state.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Gerado em {today}
          </p>
        </div>
        <div className="flex gap-2 no-print">
          <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-1.5 text-xs">
            <Printer className="w-3.5 h-3.5" />
            Imprimir / PDF
          </Button>
          <Button onClick={handleNewQuote} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Nova Cotação
          </Button>
        </div>
      </div>

      {/* Config Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            icon: <FileText className="w-4 h-4" />,
            label: 'Tipo de Licença',
            value: state.licenseType === 'live' ? 'Live' : state.licenseType === 'investigate' ? 'Investigate' : 'Matching',
          },
          {
            icon: <Calendar className="w-4 h-4" />,
            label: 'Contrato',
            value: calc.termLabel,
          },
          {
            icon: state.licenseType === 'live' ? <Camera className="w-4 h-4" /> : <MonitorSpeaker className="w-4 h-4" />,
            label: state.licenseType === 'live' ? 'Câmeras' : state.licenseType === 'investigate' ? 'Licenças' : 'Identificações',
            value: state.licenseType === 'live' ? String(state.numCameras) : state.licenseType === 'investigate' ? String(state.numScreens) : formatNumber(state.numIdentifications),
          },
          {
            icon: <Database className="w-4 h-4" />,
            label: 'Base de Dados',
            value: formatNumber(state.databaseSize),
          },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-primary mb-1">{item.icon}<span className="text-xs text-muted-foreground">{item.label}</span></div>
            <div className="font-mono font-bold text-sm text-foreground">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Additional config info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {state.licenseType === 'live' && (
          <>
            <div className="bg-card/50 border border-border/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Watchlist</div>
              <div className="font-mono text-xs text-foreground">{state.useCase === 'interest' ? 'Interest List' : 'Authorised List'}</div>
            </div>
            <div className="bg-card/50 border border-border/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Resolução</div>
              <div className="font-mono text-xs text-foreground">{state.cameraResolution === '1920x1080' ? '2MP (1080p)' : '4K (2160p)'}</div>
            </div>
          </>
        )}
        <div className="bg-card/50 border border-border/50 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Network className="w-3 h-3" /> Arquitetura</div>
          <div className="font-mono text-xs text-foreground">{state.architecture === 'centralized' ? 'Centralizada' : 'Distribuída'}</div>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Cloud className="w-3 h-3" /> Implantação</div>
          <div className="font-mono text-xs text-foreground">{state.deploymentType === 'onpremises' ? 'On-Premises' : 'Nuvem'}</div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-secondary/30">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            Detalhamento de Preços ({calc.termLabel})
          </h3>
        </div>
        <div className="p-3 space-y-0.5">
          <LineItem
            icon={<Camera className="w-4 h-4 text-primary/60" />}
            label={`Licenças de Câmera (${state.numCameras}x)`}
            sub="CSF-1C-A — Corsight Single Camera License"
            value={calc.cameraLicenses}
          />
          <LineItem
            icon={<Database className="w-4 h-4 text-primary/60" />}
            label="Expansão Base de Dados"
            sub={state.databaseSize > 2000 ? `L-CSF-DB — Até ${formatNumber(state.databaseSize)} imagens` : undefined}
            value={calc.imageDbExpansion}
          />
          <LineItem
            icon={<Server className="w-4 h-4 text-primary/60" />}
            label={`Licença Investigate (${state.numScreens}x)`}
            sub="CSF-1FCU-A — Corsight Investigate User License"
            value={calc.investigateLicense}
          />
          <LineItem
            icon={<HardDrive className="w-4 h-4 text-primary/60" />}
            label="Base de Dados Histórica"
            sub={state.needsHistoryDb ? `H-CSF-DB — Até ${formatNumber(state.historyDbSize)} registros` : undefined}
            value={calc.historyDb}
          />
          <LineItem
            icon={<Users className="w-4 h-4 text-primary/60" />}
            label={`Usuários Adicionais (${state.additionalUsers}x)`}
            sub="CSF-MU — $100/usuário/ano"
            value={calc.additionalUsers}
          />
          <LineItem
            icon={<BarChart3 className="w-4 h-4 text-primary/60" />}
            label="Real-Time Insights (30%)"
            sub="CSF-1I-A — Corsight Insights License"
            value={calc.insights}
          />
          <LineItem
            icon={<UserSearch className="w-4 h-4 text-primary/60" />}
            label="Idade & Gênero (10%)"
            sub="CSF-1AG-A — Age & Gender Estimation"
            value={calc.ageGender}
          />
          <LineItem
            icon={<Plug className="w-4 h-4 text-primary/60" />}
            label={`Integração VMS — Câmeras (${state.numCameras}x)`}
            sub={state.needsVmsIntegration ? `CSIM-1C-A — ${state.vmsType || 'Milestone/Genetec'} Camera` : undefined}
            value={calc.vmsIntegrationCameras}
          />
          <LineItem
            icon={<MapPin className="w-4 h-4 text-primary/60" />}
            label={`Integração VMS — Sites (${state.numSites}x)`}
            sub={state.needsVmsIntegration ? `CSIM-SLI-A — ${state.vmsType || 'Milestone/Genetec'} Site License` : undefined}
            value={calc.vmsIntegrationSites}
          />
          <LineItem
            icon={<Network className="w-4 h-4 text-primary/60" />}
            label="Sistema Distribuído (30%)"
            sub="CSF-DS-A — Distributed System License"
            value={calc.distributedSystem}
          />
          <LineItem
            icon={<Wrench className="w-4 h-4 text-primary/60" />}
            label={`Serviços Profissionais (${state.serviceDays} dia${state.serviceDays > 1 ? 's' : ''})`}
            sub="CSF-1PS — $1.600/dia (não inclui viagem)"
            value={calc.professionalServices}
          />

          {/* Total */}
          <div className="border-t border-border mt-3 pt-3">
            <LineItem
              icon={<DollarSign className="w-5 h-5 text-primary" />}
              label={`TOTAL (${calc.termLabel})`}
              value={calc.total}
              highlight
            />
          </div>

          {calc.termMultiplier > 1 && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Custo anual equivalente</span>
                <span className="font-mono text-primary font-semibold">{formatCurrency(calc.annualRecurring)}/ano</span>
              </div>
            </div>
          )}

          {calc.professionalServices > 0 && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total recorrente (sem serviços profissionais)</span>
                <span className="font-mono text-foreground/70">{formatCurrency(calc.total - calc.professionalServices)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hardware Recommendations - Live */}
      {state.licenseType === 'live' && calc.hardwareRecommendations.length > 0 && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowHwDetails(!showHwDetails)}
            className="w-full px-4 py-3 border-b border-border bg-secondary/30 flex items-center justify-between"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Dimensionamento de Hardware
            </h3>
            {showHwDetails ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {showHwDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4"
            >
              {/* Config summary */}
              <div className="mb-4 p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Parâmetros de Configuração</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
                  <div>
                    <span className="block text-muted-foreground/60">Câmeras</span>
                    <strong className="text-foreground font-mono">{state.numCameras}</strong>
                  </div>
                  <div>
                    <span className="block text-muted-foreground/60">Resolução</span>
                    <strong className="text-foreground font-mono">{state.cameraResolution === '1920x1080' ? '2MP (1080p)' : '4K (2160p)'}</strong>
                  </div>
                  <div>
                    <span className="block text-muted-foreground/60">Faces/stream</span>
                    <strong className="text-foreground font-mono">{state.facesPerStream}</strong>
                  </div>
                  <div>
                    <span className="block text-muted-foreground/60">Watchlist</span>
                    <strong className="text-foreground font-mono">{state.useCase === 'interest' ? 'Interest' : 'Authorised'}</strong>
                  </div>
                </div>
              </div>

              {/* Hardware options */}
              <div className="space-y-3">
                {calc.hardwareRecommendations.map((rec, i) => (
                  <motion.div
                    key={rec.hardware.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`
                      p-4 rounded-lg border transition-all
                      ${i === 0 ? 'border-primary/40 bg-primary/5 glow-cyan' : 'border-border bg-secondary/20'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MonitorSpeaker className={`w-5 h-5 ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`font-semibold ${i === 0 ? 'text-primary' : 'text-foreground'}`}>
                          {rec.hardware.name}
                        </span>
                        {i === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-xl text-foreground">
                        {rec.serversNeeded}x
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <div className="bg-background/50 rounded p-2.5">
                        <div className="text-muted-foreground/60 mb-0.5">CPU</div>
                        <div className="font-mono text-foreground">{rec.hardware.cpu}</div>
                      </div>
                      <div className="bg-background/50 rounded p-2.5">
                        <div className="text-muted-foreground/60 mb-0.5">GPU</div>
                        <div className="font-mono text-foreground">{rec.hardware.gpu}</div>
                      </div>
                      <div className="bg-background/50 rounded p-2.5">
                        <div className="text-muted-foreground/60 mb-0.5">RAM</div>
                        <div className="font-mono text-foreground">{rec.hardware.ram}</div>
                      </div>
                      <div className="bg-background/50 rounded p-2.5">
                        <div className="text-muted-foreground/60 mb-0.5">Storage</div>
                        <div className="font-mono text-foreground">{rec.hardware.storage}</div>
                      </div>
                      <div className="bg-background/50 rounded p-2.5">
                        <div className="text-muted-foreground/60 mb-0.5">OS</div>
                        <div className="font-mono text-foreground">{rec.hardware.os}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Investigate Server */}
      {state.licenseType === 'investigate' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Servidor Recomendado — Investigate
            </h3>
          </div>
          <div className="p-4">
            <div className="p-4 rounded-lg border border-primary/40 bg-primary/5 glow-cyan">
              <div className="flex items-center gap-2 mb-3">
                <MonitorSpeaker className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{investigateServer.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-background/50 rounded p-2.5">
                  <div className="text-muted-foreground/60 mb-0.5">CPU</div>
                  <div className="font-mono text-foreground">{investigateServer.cpu}</div>
                </div>
                <div className="bg-background/50 rounded p-2.5">
                  <div className="text-muted-foreground/60 mb-0.5">GPU</div>
                  <div className="font-mono text-foreground">{investigateServer.gpu}</div>
                </div>
                <div className="bg-background/50 rounded p-2.5">
                  <div className="text-muted-foreground/60 mb-0.5">RAM</div>
                  <div className="font-mono text-foreground">{investigateServer.ram}</div>
                </div>
                <div className="bg-background/50 rounded p-2.5">
                  <div className="text-muted-foreground/60 mb-0.5">Storage</div>
                  <div className="font-mono text-foreground">{investigateServer.storage}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{investigateServer.note}</p>
            </div>
          </div>
        </div>
      )}

      {/* Matching / Image Processing Server */}
      {state.licenseType === 'matching' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Servidor Recomendado — Image Processing
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {imageProcessingServers.map((srv) => (
              <div key={srv.id} className={`
                p-4 rounded-lg border
                ${state.databaseSize <= srv.maxDbSize ? 'border-primary/40 bg-primary/5 glow-cyan' : 'border-border bg-secondary/20 opacity-50'}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">{srv.name}</span>
                  {state.databaseSize <= srv.maxDbSize && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono">Compatível</span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-background/50 rounded p-2.5">
                    <div className="text-muted-foreground/60 mb-0.5">CPU</div>
                    <div className="font-mono text-foreground">{srv.cpu}</div>
                  </div>
                  <div className="bg-background/50 rounded p-2.5">
                    <div className="text-muted-foreground/60 mb-0.5">GPU</div>
                    <div className="font-mono text-foreground">{srv.gpu}</div>
                  </div>
                  <div className="bg-background/50 rounded p-2.5">
                    <div className="text-muted-foreground/60 mb-0.5">RAM</div>
                    <div className="font-mono text-foreground">{srv.ram}</div>
                  </div>
                  <div className="bg-background/50 rounded p-2.5">
                    <div className="text-muted-foreground/60 mb-0.5">Tempo Resposta</div>
                    <div className="font-mono text-foreground">{srv.responseTime}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Até {formatNumber(srv.maxDbSize)} registros
                  {srv.note && ` — ${srv.note}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="bg-card/50 border border-border rounded-lg p-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Observações Importantes</h4>
        <div className="text-xs text-muted-foreground space-y-2">
          <p>Todos os preços em USD conforme Corsight AI — Fortify Price Book Janeiro 2026 (A). Valores confidenciais.</p>
          <p>Serviços profissionais (CSF-1PS) não incluem despesas de viagem e per diem.</p>
          <p>O hardware indicado é um guia baseado no Fortify Hardware Sizing Guide. A Corsight deve aprovar oficialmente o dimensionamento final.</p>
          {state.licenseType === 'investigate' && (
            <p>Câmeras e servidores Investigate não podem operar no mesmo sistema Fortify.</p>
          )}
          {state.openToCaseStudy && (
            <p className="text-primary/80">O cliente está aberto para participar de um case study com a Corsight AI.</p>
          )}
          <p>Preços sujeitos a confirmação pela Corsight AI. Proposta gerada automaticamente pelo Price Builder — Montreal.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border pt-4 flex items-center justify-between text-xs text-muted-foreground no-print">
        <span>Corsight AI — Fortify Price Book Janeiro 2026 (A)</span>
        <span>Confidencial — Montreal</span>
      </div>

      <div className="flex justify-between pt-2 no-print">
        <Button onClick={prevStep} variant="outline" className="gap-2 h-12 px-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleNewQuote} className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          <RotateCcw className="w-4 h-4" />
          Nova Cotação
        </Button>
      </div>
    </motion.div>
  );
}
