export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export type OfferStatus =
  | 'draft'
  | 'sent'
  | 'accepted'
  | 'rejected'
  | 'closed'
  | 'paid';

export type Offer = {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  status: OfferStatus;
  value: number;
  currency: string;
  validUntil?: string;
  sentAt?: string;
  lastContact?: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PipelineStats = {
  totalValue: number;
  conversionRates: {
    sent: number;
    accepted: number;
  };
  avgTime: number;
  offersByStatus: Record<OfferStatus, number>;
};
