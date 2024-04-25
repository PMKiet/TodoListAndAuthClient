import { useEffect, useState } from 'react'

import { IoIosCheckmark } from "react-icons/io"
import { MdOutlineRestore } from "react-icons/md"
import { restoreTodo } from '../services/TodoApi/todoService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function Trash({ set }) {
    const [todoListRestore, setTodoListRestore] = useState([])
    const [isCheck, setIscheck] = useState(false)
    const Todo = useSelector((state) => state.todo.todos)

    useEffect(() => {
        const resStoreTodo = Todo.filter(todo => todo.deletedAt !== null)
        setTodoListRestore(resStoreTodo)
    }, [set])

    const handleRestoreTodo = async (id) => {
        try {
            console.log(id);
            await restoreTodo(id)
            window.location.reload()
            toast.success('Hoàn tác thành công')
        } catch (error) {
            toast.success('Hoàn tác thất bại')
            console.log('error', error)
        }
    }

    return (
        <div onClick={() => set(false)} className="w-screen h-screen fixed flex justify-center ">
            <div className="w-screen h-screen bg-black opacity-[70%] z-30"></div>
            <div className="max-w-[750px] w-[720px]  bg-[#1A1A1A] rounded-[10px] absolute z-50 mt-36 p-2">
                {todoListRestore && todoListRestore.map((todo, index) => (
                    <div key={index} className='w-[690px] max-w-[690px]  p-[16px]  flex items-center gap-3 bg-[#262626] border border-[#333] rounded-[8px]'>
                        <label
                            htmlFor="todo"
                            className={` w-4 h-4 rounded-full duration-75
                        ${isCheck === true ? 'bg-[#aa6ec2] border-0' : 'border-[#4EA8DE] border-2 '}`}
                        >
                            {isCheck && <IoIosCheckmark className='text-white' />}
                            <input className='hidden' onClick={() => setIscheck(!isCheck)} type="checkbox" id="todo" />
                        </label>
                        <span className='flex-1 max-w-[630px] max-h-[70px] scrollbar-thin  overflow-auto text-[#F2F2F2] text-[14px]'>{todo.description}</span>
                        <MdOutlineRestore className='text-white' onClick={() => handleRestoreTodo(todo._id)} />
                    </div>
                ))}
            </div>
        </div>
    )
}





// export default function Trash({ set }) {
//     const [isCheck, setIscheck] = useState(false)

//     return (
//         <div className="w-screen h-screen  fixed flex justify-center items-center">
//             <div onClick={() => set(false)} className='w-screen h-screen bg-black opacity-[70%] z-30'></div>
//             <div className='z-50 w-[720px] max-w-[720px] bg-[#1A1A1A] '>
//                 <div className='w-[690px] max-w-[690px]  p-[16px]  flex items-center gap-3 bg-[#262626] border border-[#333] rounded-[8px]'>
//                     <label
//                         htmlFor="todo"
//                         className={` w-4 h-4 rounded-full duration-75
//                         ${isCheck === true ? 'bg-[#aa6ec2] border-0' : 'border-[#4EA8DE] border-2 '}`}
//                     >
//                         {isCheck && <IoIosCheckmark className='text-white' />}
//                         <input className='hidden' onClick={() => setIscheck(!isCheck)} type="checkbox" id="todo" />
//                     </label>
//                     <span className='flex-1 max-w-[630px] max-h-[70px] scrollbar-thin  overflow-auto text-[#F2F2F2] text-[14px]'>123</span>
//                     <MdOutlineRestore className='text-white' />
//                 </div>
//             </div>
//         </div>

//     )
// }