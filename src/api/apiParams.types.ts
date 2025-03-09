interface CompanyParams {
  company?: string;
  region?: string | string[];
  companyCode?: string | string[];
  holderAccountNumber?: string | string[];
  selectedDate?: string;
}

interface ClassConvertParams {
  region: string;
  coy: string;
  hin: string;
  classCode: string;
}

interface HolderParams extends CompanyParams {
  holderId?: string | string[];
  holderIdentifier?: string;
  companyCode?: string | string[];
  region?: string | string[];
}

type ContactParams = {
  region: string;
  coy: string;
  hin: string;
};

interface CartParams {
  cartId: number;
}

interface TransferItemParams extends CartParams {
  itemId: number;
}

interface DocumentParams extends CompanyParams {
  fromDate?: string;
  toDate?: string;
  pageNumber?: number;
  pageSize?: number;
  documentId?: string;
  documentCategory?: string;
  holderIdentifier: string;
  selectedDate?: string;
}

interface PassportParams {
  passportID?: string;
}

interface RecipientParams {
  recipientIds: string;
}

interface TokenParams {
  idvToken: string;
}
interface PortfolioTransactionParams extends CompanyParams {
  additionalUrl: string;
  holderIdentifier: string;
}

interface Document {
  documentId: string;
  documentFormType: string;
  documentReceivedDate: string; // You may use Date if it's actually a Date object
  documentSystem: string;
}

interface DocumentList {
  region: string;
  companyCode: string;
  holderIdentifier: string;
  documentReceivedDate: string;
  documents: Document[];
}

interface FormattedDocumentData {
  region: string;
  companyCode: string;
  holderIdentifier: string;
  documentHoldings: {
    documentId: string;
    documentFormType: string;
    documentReceivedDate: string; // Or Date if needed
    documentSystem: string;
  }[];
}

interface FetchDocumentList {
  region: string;
  companyCode: string;
  holderIdentifier: string;
  startDate: string;
  endDate: string;
  pageNumber: number | string;
  pageSize: number;
}

export type FetchContact = {
  region: string;
  companyCode: string;
  holderIdentifier: string;
  holderId?: string;
};
type sellFeeDetailParams = {
  region: string;
  companyCode: string;
  holderIdentifier: string;
  classCode: string;
  sharesToSell: string;
};

type CoyHinParams = {
  coy: string;
  hin: string;
};

export {
  CartParams,
  ClassConvertParams,
  CompanyParams,
  ContactParams,
  DocumentList,
  DocumentParams,
  FetchDocumentList,
  FormattedDocumentData,
  HolderParams,
  PassportParams,
  PortfolioTransactionParams,
  RecipientParams,
  sellFeeDetailParams,
  TokenParams,
  TransferItemParams,
  CoyHinParams,
};
