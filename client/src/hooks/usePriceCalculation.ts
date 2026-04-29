import { useMemo } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import {
  getCameraLicensePrice,
  getImageDbPrice,
  getHistoryDbPrice,
  getMilestoneIntCameraPrice,
  getMilestoneSitePrice,
  investigateLicense,
  ADDITIONAL_USER_COST,
  INSIGHTS_PERCENTAGE,
  AGE_GENDER_PERCENTAGE,
  DISTRIBUTED_PERCENTAGE,
  PROFESSIONAL_SERVICES_DAY,
  recommendHardware,
} from '@/lib/pricingData';

export interface PriceBreakdown {
  cameraLicenses: number;
  imageDbExpansion: number;
  investigateLicense: number;
  historyDb: number;
  additionalUsers: number;
  insights: number;
  ageGender: number;
  vmsIntegrationCameras: number;
  vmsIntegrationSites: number;
  distributedSystem: number;
  professionalServices: number;
  subtotalLicenses: number;
  total: number;
  annualRecurring: number;
  hardwareRecommendations: ReturnType<typeof recommendHardware>;
  termLabel: string;
  termMultiplier: number;
}

export function usePriceCalculation(): PriceBreakdown {
  const { state } = usePricing();

  return useMemo(() => {
    const term = state.contractTerm;
    let termMultiplier = 1;
    let termLabel = 'Anual';
    if (term === 'threeYear') { termMultiplier = 3; termLabel = '3 Anos'; }
    if (term === 'fiveYear') { termMultiplier = 5; termLabel = '5 Anos'; }

    // Camera Licenses (only for live)
    let cameraLicenses = 0;
    if (state.licenseType === 'live') {
      cameraLicenses = getCameraLicensePrice(state.numCameras, term);
    }

    // Image DB Expansion
    let imageDbExpansion = 0;
    if (state.databaseSize > 2000 && (state.licenseType === 'live' || state.licenseType === 'matching')) {
      imageDbExpansion = getImageDbPrice(state.databaseSize, term);
    }

    // Investigate License
    let investigateLic = 0;
    if (state.licenseType === 'investigate') {
      const prices = investigateLicense;
      investigateLic = term === 'annual' ? prices.annual :
                       term === 'threeYear' ? prices.threeYear :
                       prices.fiveYear;
      investigateLic *= state.numScreens;
    }

    // History Database
    let historyDb = 0;
    if (state.needsHistoryDb && state.historyDbSize > 0) {
      historyDb = getHistoryDbPrice(state.historyDbSize, term);
    }

    // Additional Users
    const additionalUsers = state.additionalUsers * ADDITIONAL_USER_COST;

    // Subtotal licenses before percentage-based add-ons
    const baseLicenses = cameraLicenses + imageDbExpansion + investigateLic + historyDb + additionalUsers;

    // Insights (30% of total licenses)
    const insights = state.needsInsights ? baseLicenses * INSIGHTS_PERCENTAGE : 0;

    // Age & Gender (10% of total licenses)
    const ageGender = state.needsAgeGender ? baseLicenses * AGE_GENDER_PERCENTAGE : 0;

    // VMS Integration
    let vmsIntegrationCameras = 0;
    let vmsIntegrationSites = 0;
    if (state.needsVmsIntegration) {
      vmsIntegrationCameras = getMilestoneIntCameraPrice(state.numCameras);
      vmsIntegrationSites = getMilestoneSitePrice(state.numSites);
    }

    // Subtotal
    const subtotalLicenses = baseLicenses + insights + ageGender + vmsIntegrationCameras + vmsIntegrationSites;

    // Distributed System (30% of total)
    const distributedSystem = state.architecture === 'distributed' ? subtotalLicenses * DISTRIBUTED_PERCENTAGE : 0;

    // Professional Services
    const professionalServices = state.needsProfessionalServices ? state.serviceDays * PROFESSIONAL_SERVICES_DAY : 0;

    // Total
    const total = subtotalLicenses + distributedSystem + professionalServices;

    // Annual recurring (without professional services)
    const annualRecurring = (subtotalLicenses + distributedSystem) / termMultiplier;

    // Hardware Recommendations
    let hardwareRecommendations: ReturnType<typeof recommendHardware> = [];
    if (state.licenseType === 'live') {
      hardwareRecommendations = recommendHardware(
        state.numCameras,
        state.useCase,
        state.cameraResolution,
        state.facesPerStream
      );
    }

    return {
      cameraLicenses,
      imageDbExpansion,
      investigateLicense: investigateLic,
      historyDb,
      additionalUsers,
      insights,
      ageGender,
      vmsIntegrationCameras,
      vmsIntegrationSites,
      distributedSystem,
      professionalServices,
      subtotalLicenses,
      total,
      annualRecurring,
      hardwareRecommendations,
      termLabel,
      termMultiplier,
    };
  }, [state]);
}
