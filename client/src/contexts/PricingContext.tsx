import React, { createContext, useContext, useState, useCallback } from 'react';

export type LicenseType = 'live' | 'investigate' | 'matching';
export type UseCase = 'interest' | 'authorised';
export type ContractTerm = 'annual' | 'threeYear' | 'fiveYear';
export type Architecture = 'centralized' | 'distributed';
export type CameraResolution = '1920x1080' | '3840x2160';

export interface PricingState {
  // Step 1: Basic Info
  clientName: string;
  projectName: string;

  // Step 2: Use Case
  licenseType: LicenseType;
  useCase: UseCase;

  // Step 3: Sizing
  numCameras: number;
  numScreens: number;
  numIdentifications: number;
  cameraResolution: CameraResolution;
  facesPerStream: number;

  // Step 4: Database
  databaseSize: number;
  historyDbSize: number;
  needsHistoryDb: boolean;

  // Step 5: Contract
  contractTerm: ContractTerm;
  numUsers: number;
  additionalUsers: number;

  // Step 6: Add-ons
  needsInsights: boolean;
  needsAgeGender: boolean;
  needsVmsIntegration: boolean;
  vmsType: string;
  numSites: number;

  // Step 7: Architecture
  architecture: Architecture;
  deploymentType: 'cloud' | 'onpremises';

  // Step 8: Professional Services
  needsProfessionalServices: boolean;
  serviceDays: number;

  // Step 9: Case Study
  openToCaseStudy: boolean;

  // UI State
  currentStep: number;
  isComplete: boolean;
}

const initialState: PricingState = {
  clientName: '',
  projectName: '',
  licenseType: 'live',
  useCase: 'interest',
  numCameras: 10,
  numScreens: 1,
  numIdentifications: 1000,
  cameraResolution: '1920x1080',
  facesPerStream: 5,
  databaseSize: 2000,
  historyDbSize: 0,
  needsHistoryDb: false,
  contractTerm: 'annual',
  numUsers: 1,
  additionalUsers: 0,
  needsInsights: false,
  needsAgeGender: false,
  needsVmsIntegration: false,
  vmsType: '',
  numSites: 1,
  architecture: 'centralized',
  deploymentType: 'onpremises',
  needsProfessionalServices: false,
  serviceDays: 1,
  openToCaseStudy: false,
  currentStep: 0,
  isComplete: false,
};

interface PricingContextType {
  state: PricingState;
  updateState: (updates: Partial<PricingState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetState: () => void;
  totalSteps: number;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PricingState>(initialState);
  const totalSteps = 7;

  const updateState = useCallback((updates: Partial<PricingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, totalSteps),
      isComplete: prev.currentStep + 1 >= totalSteps,
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, totalSteps)),
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <PricingContext.Provider value={{ state, updateState, nextStep, prevStep, goToStep, resetState, totalSteps }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}
