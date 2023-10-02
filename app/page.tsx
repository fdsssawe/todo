"use client"
import { useStore } from "@/store"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useModalUCProvider } from "@/hooks/modal-uc-provider";
import Modal from "@/components/modal"
import { useModalEdit } from "@/hooks/modal-edit-todo"
import ModalEdit from "@/components/modal-edit"


export default function Home() {

  const openModal = useModalUCProvider((state)=>state.openModal)
  const openModalEdit = useModalEdit((state)=>state.openModal)
  const [isMounted, setIsMounted] = useState(false)
  const {todos, fetchTodos} = useStore()
  const router = useRouter()

  useEffect(()=>{
    fetchTodos()
    setIsMounted(true);
  },[])


  const confirm = async (id : string) => {
    await axios.post("http://localhost:5000/api/confirmTodo",{id})
    router.push("/")
  }

  const deleteTodo = async (id : string) => {
    await axios.post("http://localhost:5000/api/deleteTodo",{id})
    router.push("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <Modal/>  
      <div className='w-full h-16 flex mb-10 bg-gray-800 text-white rounded-lg'>
      <div className='flex justify-end w-[55%]'>
      <div className='font-extrabold font-mono text-3xl pt-[1rem]'>
        Todo List
      </div>
      </div>
      <div className='flex justify-end w-[44%] my-2.5'>
        <button className="font-bold font-mono text-xl bg-blue-700 px-2 rounded-lg" onClick={()=>openModal()}>Add Todo</button>
      </div>
      </div>
      <div className='flex w-full h-full gap-3'>
        {todos ? todos.map((todo : {name : string , description : string , isDone : boolean, _id:string})=>{
          return (
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ModalEdit todo={todo}/>
              <a className="flex justify-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{todo.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-center">{todo.description}</p>
              <a  className={`mr-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white ${!todo.isDone ? "bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" : 'bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}`} onClick={async ()=> await confirm(todo._id)}>
                  {todo.isDone ? "Done" : "In Progress"}
              </a>
              <a  className="inline-flex mr-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={async ()=> await deleteTodo(todo._id)}>
                  Delete Todo
              </a>
              <a  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>openModalEdit()}>
                  Edit Todo
              </a>
          </div>
          )
        })
        :
        null
      }

      </div>
    </main>
  )
}
