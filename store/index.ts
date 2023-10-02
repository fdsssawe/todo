import {create} from "zustand"
import axios from "axios";

interface useStoreParams {
    todos: [];
    fetchTodos: () => Promise<any>;
  }

export const useStore = create<useStoreParams>((set) => ({
  todos: [],
    fetchTodos : async () => {
      const response = await axios.get('http://localhost:5000/api/getTodos')
      set({todos : response.data})
    }
}))