import {
  CartParams,
  CompanyParams,
  DocumentParams,
  FetchContact,
  HolderParams,
  PassportParams,
  PortfolioTransactionParams,
  RecipientParams,
  sellFeeDetailParams,
  TokenParams,
  TransferItemParams,
} from "@api/apiParams.types";
import Config from "react-native-config";
import { ClassConvertRequestParams } from "./features/transact/classConversion/types";

export const apiEndpoints = {
  // General Endpoints
  verifyData: "/shareholder/user/v1/idv/verify-data",
  idvMock: "/shareholder/user/v1/idv/mock",
  startIdv: "/shareholder/user/v1/idv/initiate",
  submitFeedback: "/shareholder/feedbacks/v1/feedbacks",

  companiesList: (debouncedTextInputValue: string) =>
    `${
      "/issuer/company/v1/companies" +
      `/${"NA"}?searchTerm=${debouncedTextInputValue}&principalCountryOfProcessing=${"USA"}&pageNumber=1&pageSize=25`
    }`,
  encryptedConnectInvestor: {
    key: "excuteClaimEncryptedAPI",
    getUrl: () =>
      Config.IC3_API_BASE_URL +
      "/shareholder/users/v1/claims/grant-encrypted/NA",
  },

  connectInvestor: {
    key: "submitConnectValuesForHANUSA",
    getUrl: () =>
      Config.IC3_API_BASE_URL + "/shareholder/users/v1/claims/grant/NA",
  },

  pac: {
    sendPac: {
      key: "navigateSendPACJourney",
      getUrl: () =>
        Config.IC3_API_BASE_URL + "/shareholder/users/v1/pac/NA/send-pac",
    },

    pacRequired: {
      key: "PACRequiredJourney",
      getUrl: () =>
        Config.IC3_API_BASE_URL + "/shareholder/users/v1/pac/NA/pac-required",
    },

    reSendPac: {
      key: "reSendPACJourney",
      getUrl: () =>
        Config.IC3_API_BASE_URL + "/shareholder/users/v1/pac/NA/resend-pac",
    },

    sendPacEncrypted: {
      key: "sendPACncryptedAPI",
      getUrl: () =>
        Config.IC3_API_BASE_URL +
        "/shareholder/users/v1/pac/{region}/send-pac-encrypted",
    },

    validatePac: {
      key: "validatePACJourney",
      getUrl: (postAllocationCode: string) =>
        Config.IC3_API_BASE_URL +
        `/shareholder/users/v1/pac/NA/${postAllocationCode}/validate`,
    },
  },

  // Shareholder Transfer Endpoints
  transfer: {
    updateTransferRecipient:
      "/shareholder/transfer/v1/transfers/transfer-recipient",

    addTransferRecipient:
      "/shareholder/transfer/v1/transfers/transfer-recipient",

    createTransferCart: "/shareholder/transfer/v1/transfers/transfer-cart",

    viewTransferActivities: "/shareholder/transfer/v1/transfers/transfer-items",

    listTransferReasons: "/shareholder/transfer/v1/transfers/reasons",

    reviewCart: (params: CartParams) =>
      `/shareholder/transfer/v1/transfers/transfer-cart?cartId=${params.cartId}`,

    reviewTransferFees: (params: TransferItemParams) =>
      `/shareholder/transfer/v1/transfers/transaction-cart/${params.cartId}/transfer-item/${params.itemId}/fees`,

    getSecurities: (params: HolderParams) =>
      `/shareholder/transfer/v1/transfers/securities?region=${params.region}&holderId=${params.holderId}&companyCode=${params.companyCode}`,

    getCostBasis: (params: TransferItemParams) =>
      `/shareholder/transfer/v1/transfers/transaction-cart/${params.cartId}/transfer-item/${params.itemId}/cost-basis`,

    addRecipients: (params: TransferItemParams) =>
      `/shareholder/transfer/v1/transfers/transaction-cart/${params.cartId}/transfer-item/${params.itemId}/recipients`,

    fetchTransferCart: (params: CartParams) =>
      `/shareholder/transfer/v1/transfers/transaction-cart?cartId=${params.cartId}`,

    processPayment: (params: CartParams) =>
      `/shareholder/transfer/v1/transfers/transaction-cart/${params.cartId}/checkout`,

    getRecipientDetails: (params: RecipientParams) =>
      `/shareholder/transfer/v1/transfers/transfer-recipient?recipientIds=${params.recipientIds}`,
  },

  // Shareholder Assets and Portfolio Endpoints
  assets: {
    getSellShareTaxStatus: {
      key: "getSellShareTaxStatus",
      getUrl: (params: PassportParams & { region: string }) =>
        `/shareholder/assets/v1/portfolio/${params.region}/${params.passportID}/taxation`,
    },
    getHolderBalances: (params: HolderParams) =>
      `/shareholder/assets/v1/holders/NA/${params.companyCode}/${params.holderId}/balances?classFilter=web`,
    // Balncer
    getselectClassBalncerList: {
      key: "getselectClassBalncerList",
      getUrl: (params: HolderParams) =>
        `/shareholder/assets/v1/holders/NA/${params.companyCode}/${params.holderId}/balances`,
    },

    convertClassRequest: (params: ClassConvertRequestParams) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.coy}/${params.hin}/classes/${params.classCode}/conversions`,

    portfolioTransaction: (params: PortfolioTransactionParams) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/${params.additionalUrl}`,
    portfolioTransactionList: {
      key: "portfolioTransactionList",
      getUrl: (params: PortfolioTransactionParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/${params.additionalUrl}`,
    },
    shareHolderList: {
      key: "fetchShareListSort",
      getUrl: (params: PassportParams) =>
        `/shareholder/assets/v1/portfolio/NA/${params.passportID}`,
    },
    stopMaintenanceInfo: {
      key: "stopMaintenanceInfo",
    },
    stopTradeInfo: {
      key: "stopTradeInfo",
    },
    getShareHolderAssets: (params: PassportParams) =>
      `/shareholder/assets/v1/portfolio/NA/${params.passportID}`,

    getHolderAddress: {
      key: "useContactList",
      getUrl: (params: HolderParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}`,
    },

    updateHolderAddress: {
      key: "updateHolderAddress",
      updateUrl: (params: PassportParams & CompanyParams) =>
        `/shareholder/assets/v1/portfolio/${params.region}/${params.passportID}/address`,
    },
    ssn: {
      key: "submitConnectValuesForSSN",
      getSsn: (params: CompanyParams) =>
        `/shareholder/assets/v1/holders/NA/${params.company}`,
    },

    editBankInfo: (params: HolderParams) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/payments/banking-instructions/direct-credit`,

    getBankInfo: (params: HolderParams & { holderAccountNumber: string }) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/payments/banking-instructions/direct-credit`,
    EditBankDetails: {
      key: "EditBankDetails",
      getUrl: (params: CompanyParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/payments/banking-instructions/direct-credit`,
    },

    BankingDetails: {
      key: "FetchBankDetails",
      getUrl: (params: CompanyParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/payments/banking-instructions/direct-credit`,
    },
    getCommunicationPrefs: {
      key: "getCommunicationPrefs",
      getUrl: (params: HolderParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/communication-preferences`,
    },

    updateCommunicationPrefs: {
      key: "updateCommunicationPrefs",
      getUrl: (params: PassportParams & CompanyParams) =>
        `/shareholder/assets/v1/portfolio/${params.region}/${params.passportID}/communication-preferences`,
    },

    getSmsData: {
      key: "useTextNotificationList",
      getUrl: (params: HolderParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderAccountNumber}/sms-registration`,
    },

    updateCommunicationPhoneNumber: {
      key: "updateCommunicationPhoneNumber",
      getUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/sms-registration`,
    },

    getFetchData: (params: FetchContact) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}`,

    additionalUrl: (
      transactionType: string,
      pageParam: number,
      pageSize: number
    ) =>
      `transactions?transactionType=${transactionType}&pageNumber=${pageParam}&pageSize=${pageSize}`,

    getEntitlementStatus: {
      key: "getEntitlementStatus",
      getUrl: () =>
        Config.IC3_API_BASE_URL + `/shareholder/assets/v1/entitlement/NA`,
    },
  },

  // Document-related Endpoints
  documents: {
    listDocuments: (params: DocumentParams) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/documents?fromDate=${params.fromDate}&toDate=${params.toDate}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`,

    getDocumentPdf: {
      key: "fetchDocumentPdf",
      getUrl: (params: DocumentParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/documents/${params.documentId}`,
    },
    getBalanceLetter: {
      key: "fetchBalanceLetterPdf",
      getUrl: (params: DocumentParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/balances?asAtDate=${params.selectedDate}`,
    },
    documentsList: {
      key: "fetchDocumentList",
      getUrl: (params: DocumentParams) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderIdentifier}/documents?fromDate=${params.fromDate}&toDate=${params.toDate}&documentCategory=${params.documentCategory}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`,
    },
  },

  // Profile Management Endpoints
  profile: {
    updateEmail: {
      key: "editEmailAddress",
      updateUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/contact-information/email-address`,
    },
    updateAdditionalNumber: {
      key: "editAdditionalNumber",
      updateUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/contact-information/additional-number`,
    },
    updatePhone: {
      key: "editPhoneNumber",
      updateUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/contact-information/phone-numbers`,
    },
    updateAddrss: {
      key: "editAddress",
      updateUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/contact-information/address`,
    },

    updateProfilePhone: {
      key: "updateProfilePhone",
      updateUrl: (params: PassportParams) =>
        `shareholder/assets/v1/portfolio/NA/${params.passportID}/contact-information/phone-numbers`,
    },

    getProfileDetails: {
      key: "getProfileDetails",
      getUrl: (params: PassportParams) =>
        `/shareholder/user/v1/passports/${params.passportID}`,
    },

    getSmsRegistration: (params: PassportParams) =>
      `/shareholder/assets/v1/portfolio/NA/${params.passportID}/sms-registration`,
  },

  // Company Information Endpoints
  company: {
    getCompanyList: (params: CompanyParams) =>
      `/issuer/company/v1/companies/${params.region}/${params.companyCode}/contact-information`,

    getCompanyShares: (params: CompanyParams & { action: string }) =>
      `/issuer/company/v1/companies/${params.region}/${params.companyCode}/status?action=${params.action}`,
  },

  sellShares: {
    getSellFeeDetails: {
      key: "fetchSellFeeDetails",
      getUrl: (params: sellFeeDetailParams) =>
        `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderIdentifier}/fees/${params.classCode}?sharesToSell=${params.sharesToSell}&bulkTradeType=RealTime`,
    },
    getPreSellBulkStatus: {
      key: "fetchBulkStatus",
      getUrl: (params: HolderParams & { classCode: string }) =>
        `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderId}/pre-sales-parameters/${params.classCode}`,
    },
    getSellShareRequest: {
      key: "SellShareRequest",
      getUrl: (params: HolderParams & { classCode: string }) =>
        `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderId}/sell-request/${params.classCode}`,
    },
  },

  // Additional Endpoints
  getSellLimit: (params: HolderParams & { classCode: string }) =>
    `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderId}/estimate/${params.classCode}`,
  getPreSellBulkStatus: (params: HolderParams & { classCode: string }) =>
    `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderId}/pre-sales-parameters/${params.classCode}`,
  getSellShareRequest: (params: HolderParams & { classCode: string }) =>
    `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderId}/sell-request/${params.classCode}`,

  getSellFeeDetails: (params: HolderParams & { classCode: string }) =>
    `/shareholder/assets/v1/sales/${params.region}/${params.companyCode}/${params.holderIdentifier}/fees/${params.classCode}`,
  getSellShareTaxStatus: {
    key: "useGetHoldingCertify",
    getUrl: (params: PassportParams & { region: string }) =>
      `/shareholder/assets/v1/portfolio/${params.region}/${params.passportID}/taxation`,
  },

  updateConfirmationTax: {
    key: "updateConfirmationTax",
    getUrl: () => `/shareholder/assets/v1/holders/NA/taxation/certify`,
  },
  dividends: {
    getDividendEnroll: (params: HolderParams) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}/pre-sales-parameters/payments/plan-elections/dividend-reinvestment`,

    // updateDividendEnroll: (params: HolderParams & { planId: string }) =>
    //   `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}/reinvestments/dividend-plans/${params.planId}`,

    retrieveEnrollData: (params: HolderParams & { classCode: string }) =>
      `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}/reinvestments/dividend-plans?classCode=${params.classCode}`,

    updateDividendEnroll: {
      key: "updateDividendEnroll",
      getUrl: (params: HolderParams & { planId: string }) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}/reinvestments/dividend-plans/${params.planId}`,
    },
    getRetriveEnrollData: {
      key: "getRetriveEnrollData",
      getUrl: (params: HolderParams & { classCode: string }) =>
        `/shareholder/assets/v1/holders/${params.region}/${params.companyCode}/${params.holderId}/reinvestments/dividend-plans?classCode=${params.classCode}`,
    },
  },

  getIdvStatus: (params: TokenParams) =>
    `/shareholder/user/v1/idv/${params.idvToken}/status`,

  idvStatus: {
    key: "fetchIdvStatus",
    getUrl: (params: TokenParams) =>
      Config.IC3_API_BASE_URL +
      `/shareholder/users/v1/idv/${params.idvToken}/status`,
  },
  idvMockStatus: {
    key: "fetchIdvMock",
    getUrl: "/shareholder/user/v1/idv/mock",
  },
};
