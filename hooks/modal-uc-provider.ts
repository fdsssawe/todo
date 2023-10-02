import {create} from "zustand"


interface modalUCProviderParams {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  }

export const useModalUCProvider = create<modalUCProviderParams>((set) => ({
    isOpen: false,
    openModal : () => {
        set({isOpen : true})
    },
    closeModal : () => {
        set({isOpen : false})
    }
}))