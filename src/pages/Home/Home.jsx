import logo from '../../assets/rocket.svg'
import AddTodo from '../../components/AddTodo'
import { useState, useEffect } from 'react'
import { IoIosAddCircleOutline, IoMdTrash, IoIosCheckmark } from "react-icons/io"
import { FaRegEdit } from "react-icons/fa"
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTodo, deleteTodo } from '../../services/TodoApi/todoService'
import { useDispatch } from 'react-redux'
import { addTodoSuccess, addTodoFail } from '../../redux/todoSlice'
import { toast } from 'react-toastify'
import { logout } from '../../services/authAPI/userService'
import Trash from '../../components/Trash'

export default function Home() {
    const [isCheck, setIscheck] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [isShowTrash, setIsShowTrash] = useState(false)
    const [addDescription, setAddDescription] = useState('')
    const [todos, setTodos] = useState([])

    const navigate = useNavigate()
    const user = useSelector((state) => state.user.login.user)
    const dispatch = useDispatch()
    useEffect(() => {
        handleGetTodo()
    }, [setTodos])

    const handleGetTodo = async () => {
        try {
            const userId = user?._id
            let res = await getTodo(userId)
            dispatch(addTodoSuccess(res.data))
            const todoNotDelete = res.data.filter(todo => todo.deletedAt === null)
            setTodos(todoNotDelete)
        } catch (error) {
            dispatch(addTodoFail(error))
            console.log('error', error)
        }
    }

    const handledeleteTodo = async (id) => {
        try {
            const now = new Date()
            const deletedAt = now.toISOString()
            await deleteTodo(id, deletedAt)
            window.location.reload()
            toast.success('Xóa thành công')
        } catch (error) {
            toast.success('Xóa thất bại')
            console.log('error', error)
        }
    }

    const handleLogout = async () => {
        try {
            if (!user) return
            const userId = user._id
            await logout(userId)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('persist:root')
            navigate('/auth/login')
            window.location.reload()
            toast.success('Đăng xuất thành công')
        } catch (error) {
            toast.success('Đăng xuất thất bại')
            console.log('error', error)
        }
    }


    return (

        <div className="h-screen flex flex-col relative">
            {/* First haft */}
            <div className="h-[200px] bg-[#0D0D0D] relative flex justify-center items-center">
                {/* logo */}
                <div className='flex justify-center'>
                    <img src={logo} alt="Todo" />
                    <span className='text-[40px] text-[#4EA8DE] font-[900] leading-normal cursor-pointer'>
                        To
                        <span className='text-[#5E60CE]'>Do</span>
                    </span>
                </div>
                <div className='absolute text-[#F2F2F2] right-4 top-3'>
                    {!user ? <span>Bạn chưa đăng nhập</span> : <span>Xin chào: {user.username}</span>}
                    {
                        !user
                            ?
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => navigate('/auth/register')}
                                    className='bg-[#1E6F9F] rounded-[8px] py-2 px-[14px] text-[14px] font-bold '>Đăng ký</button>
                                <button
                                    onClick={() => navigate('/auth/login')}
                                    className='bg-[#1E6F9F] rounded-[8px] py-2 px-[14px] text-[14px] font-bold '>Đăng Nhập</button>
                            </div>
                            :
                            <div className='flex'>
                                <button
                                    onClick={() => handleLogout()}
                                    className='bg-[#1E6F9F] rounded-[8px] py-2 px-[14px] text-[14px] font-bold '>Đăng xuất</button>
                            </div>
                    }
                </div>
                {/* input */}
                <div className='flex justify-center absolute bottom-0 translate-y-[50%] gap-2'>
                    <input
                        className='bg-[#262626] w-[600px] rounded-[8px] border border-[#0D0D0D] p-[8px] text-[16px] text-[#808080] placeholder-[#808080] focus:outline-none'
                        type="text"
                        placeholder='Tìm Kiếm'
                    />
                    <button
                        onClick={() => setIsShow(true)}
                        className='bg-[#1E6F9F] rounded-[8px] p-[16px] flex items-center gap-2 text-[14px] font-bold text-[#F2F2F2]'>
                        Add <IoIosAddCircleOutline className='text-[16px] w-[16px]' />
                    </button>
                </div>
            </div>

            {/* Last haft */}
            <div className="flex-1 bg-[#1A1A1A] scrollbar-thumb-sky-700 scrollbar-track-sky-300 pt-10 flex items-center justify-start flex-col gap-2">

                {todos && todos.map((todo, index) => (
                    <div key={index} className='w-[690px] p-[16px] max-w-[690px] flex items-center gap-3 bg-[#262626] border border-[#333] rounded-[8px]'>
                        <label
                            htmlFor="todo"
                            className={` w-4 h-4 rounded-full duration-75
                        ${isCheck === true ? 'bg-[#aa6ec2] border-0' : 'border-[#4EA8DE] border-2 '}`}
                        >
                            {isCheck && <IoIosCheckmark className='text-white' />}
                            <input className='hidden' onClick={() => setIscheck(!isCheck)} type="checkbox" id="todo" />
                        </label>
                        <span className='flex-1 max-w-[630px] max-h-[70px] scrollbar-thin  overflow-auto text-[#F2F2F2] text-[14px]'>{todo.description}</span>
                        <FaRegEdit className='text-white' onClick={() => navigate(`/todo/update/${todo._id}`)} />
                        <IoMdTrash className='text-[red]' onClick={() => handledeleteTodo(todo._id)} />
                    </div>
                ))}

                <div className='absolute bottom-7 right-7 w-[50px] h-[50px] bg-[#1E6F9F] rounded-[8px] flex items-center gap-2 text-[24px] font-bold text-[#F2F2F2]'>
                    <IoMdTrash onClick={() => setIsShowTrash(true)} className='m-auto' />
                </div>

            </div>

            {isShow && <AddTodo set={setIsShow} description={addDescription} setDescription={setAddDescription} text={'Add'} />}
            {isShowTrash && <Trash set={setIsShowTrash} />}
            <Outlet />
        </div >
    )
}
