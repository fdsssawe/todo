import {create} from "zustand"


interface modalEditTodoParams {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  }

export const useModalEdit = create<modalEditTodoParams>((set) => ({
    isOpen: false,
    openModal : () => {
        set({isOpen : true})
    },
    closeModal : () => {
        set({isOpen : false})
    }
}))