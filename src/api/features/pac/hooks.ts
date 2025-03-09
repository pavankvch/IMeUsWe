import { BaseClaim } from "@api/features/connectSecurities";
import { apiEndpoints } from "@app/api/apiEndpoints";
import {
  requiredPAC,
  reSendPAC,
  sendPAC,
  validatePAC,
} from "@app/api/features/Pac/pac";
import {
  resendPacData,
  validationPacData,
} from "@app/api/features/Pac/pac.types";
import {
  useReactMutationFn,
  useReactQueryFn,
} from "@cpu-private/mobile-foundation-library";

const useNavigateSendPACJourney = () => {
  const { key } = apiEndpoints.pac.sendPac;
  return useReactMutationFn({
    mutationKey: [key],
    mutationFn: (data: BaseClaim) => sendPAC(data),
  });
};

const useReSendPACJourney = () => {
  const { key } = apiEndpoints.pac.reSendPac;
  return useReactMutationFn({
    mutationKey: [key],
    mutationFn: (data: resendPacData) => reSendPAC(data),
  });
};

const useValidatePACJourney = () => {
  const { key } = apiEndpoints.pac.validatePac;
  return useReactMutationFn({
    mutationKey: [key],
    mutationFn: (data: validationPacData) => validatePAC(data),
  });
};

const usePacRequiredJourney = (passportId: string) => {
  const { key } = apiEndpoints.pac.pacRequired;
  return useReactQueryFn({
    queryFn: async () => requiredPAC(),
    options: {
      queryKey: [key],
      enabled: !!passportId,
    },
  });
};

export {
  useNavigateSendPACJourney,
  usePacRequiredJourney,
  useReSendPACJourney,
  useValidatePACJourney,
};
