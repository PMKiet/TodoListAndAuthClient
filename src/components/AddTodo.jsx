import { FaWindowClose } from "react-icons/fa"
import { toast } from 'react-toastify'
import { createTodo } from '../services/TodoApi/todoService'

export default function AddTodo({ set, description, setDescription, text }) {

    const handleCreate = async () => {
        try {
            if (!description.trim()) {
                return toast.error('Không được bỏ trống')
            }

            let res = await createTodo(description)
            if (res.status === 201) {
                setDescription('')
                set(false)
                window.location.reload()
                toast.success('Thêm thành công')
            }

        } catch (error) {
            const message = error?.response?.data?.message
            toast.error(message)
            console.log('Error', error)
        }
    }



    return (
        <div className="w-screen h-screen fixed flex justify-center ">
            <div onClick={() => { set(false) }} className="w-screen h-screen bg-black opacity-[70%] z-30"></div>
            <div className="max-w-[500px] w-[500px] max-h-[300px] h-[200px] bg-[#1A1A1A] rounded-[10px] absolute z-50 mt-36 p-2">
                <div className="flex justify-end ">
                    <FaWindowClose className="text-[20px] rounded-[3px] text-[#d3c6c6]" onClick={() => set(false)} />
                </div>
                <div className="flex justify-center mt-4">
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-[400px] rounded-[3px] bg-[#333232] outline-none text-[#a09d9d] py-[5px] px-[10px]"
                        type="text"
                    />
                </div>
                <div className="flex gap-2 mt-16 justify-end text-[#ffffff] text-[12px]">
                    <button
                        onClick={() => set(false)}
                        className="rounded-[3px] p-2 bg-[red]"
                    >Cancel</button>
                    <button
                        onClick={() => handleCreate()}
                        className="rounded-[3px] p-2 bg-[green]"
                    >{text}</button>
                </div>
            </div>
        </div>
    )
}
