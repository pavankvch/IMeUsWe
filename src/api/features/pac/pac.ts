import { BaseClaim } from "@api/features/connectSecurities";
import { apiEndpoints } from "@app/api/apiEndpoints";
import {
  resendPacData,
  validationPacData,
} from "@app/api/features/Pac/pac.types";
import {
  getRequestWithUrl,
  handleError,
  postRequestWithUrl,
} from "@cpu-private/mobile-foundation-library";
import { handlePacErrors } from "@helpers/commonFunctions";
import { getAuthHeaders } from "@utils/webheaders";
import { AxiosError } from "axios";

const requiredPAC = async () => {
  const url = apiEndpoints.pac.pacRequired.getUrl();
  try {
    return await getRequestWithUrl(url, {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    handleErrorConditionally(error);
  }
};

const sendPAC = async (data: BaseClaim) => {
  const url = apiEndpoints.pac.sendPac.getUrl();
  try {
    return await postRequestWithUrl(url, data, {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    handleErrorConditionally(error);
  }
};

const reSendPAC = async (data: resendPacData) => {
  const url = apiEndpoints.pac.reSendPac.getUrl();
  try {
    return await postRequestWithUrl(url, data, {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    handleErrorConditionally(error);
  }
};

const validatePAC = async (data: validationPacData) => {
  const url = apiEndpoints.pac.validatePac.getUrl(data.postalActivationCode);
  const requestData = { postalActivationCode: data.activationID };
  return await postRequestWithUrl(url, requestData, {
    headers: await getAuthHeaders(),
  });
};

const handleErrorConditionally = (error: unknown) => {
  if (error instanceof AxiosError && error?.response?.status === 504) {
    handleError(error);
  } else {
    handlePacErrors(error);
  }
};

export { requiredPAC, reSendPAC, sendPAC, validatePAC };
