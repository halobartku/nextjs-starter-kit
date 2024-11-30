import { create } from 'zustand';

type ModalType = 'createOffer' | 'editOffer' | 'viewOffer' | 'createClient' | 'editClient';

interface ModalData {
  offerId?: string;
  clientId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | null;
  isOpen: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  openModal: (type, data = null) => set({ type, data, isOpen: true }),
  closeModal: () => set({ type: null, data: null, isOpen: false }),
}));
