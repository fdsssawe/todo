"use client";

import { useModalEdit } from '@/hooks/modal-edit-todo';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'

export default function ModalEdit({todo} : {todo:any}) {


    const {isOpen , closeModal } = useModalEdit()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
      });
    
      const handleSubmit = async (e : any) => {
        e.preventDefault();
        console.log(formData)
        const data = {...formData, id : todo._id}
        console.log(data)
        try {
          const response = await axios.post('http://localhost:5000/api/changeTodo', {data})

        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

  return (

    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="bg-white rounded-lg shadow relative ">
                <div className="flex justify-end p-2">
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-indigo-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  hover:text-white" onClick={closeModal}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-medium text-gray-900 ">Edit todo</h3>
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 ">Name</label>
                        <input onChange={handleChange} value={formData.name} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="todo name" />
                    </div>
                    <div>
                        <label  className="text-sm font-medium text-gray-900 block mb-2 ">Description</label>
                        <input type="description" name="description" id="description" value={formData.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="describe your todo" />
                    </div>
                    <button type="submit" className="w-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-200">Confirm changes</button>
                </form>
            </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
