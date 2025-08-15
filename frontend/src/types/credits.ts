export type CreateCredit = {
  clientName: string;
  clientId: string;
  creditValue: number;
  interestRate: number;
  termMonths: number;
};

export interface GetCredits {
  id?: number;
  clientName?: string;
  clientId?: string;
  creditValue?: number;
  interestRate?: number;
  termMonths?: number;
  createdAt?: string;
  sortBy?: "createdAt" | "creditValue";
  order?: "asc" | "desc";
}
