import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../services/authAPI/userService"
import { useState } from "react"
import { toast } from 'react-toastify'

export default function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [isErrorUsername, setIsErrorUsername] = useState(false)
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const navigate = useNavigate()
    const handleRegister = async () => {
        try {
            const toastError = toast.error('Tối thiểu 5 ký tự')
            if (email.length && username.length && password.length < 5) {
                setIsErrorEmail(true)
                setIsErrorUsername(true)
                setIsErrorPassword(true)
                return toastError
            } else {
                if (email.length <= 5) {
                    setIsErrorEmail(true)
                    return toastError
                } else {
                    setIsErrorEmail(false)
                }
                if (username.length <= 5) {
                    setIsErrorUsername(true)
                    return toastError
                } else {
                    setIsErrorUsername(false)
                }
                if (password.length <= 5) {
                    setIsErrorPassword(true)
                    return toastError
                } else {
                    setIsErrorPassword(false)
                }
            }

            const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const validate = emailRegExp.test(email)
            if (validate === false) {
                return toast.error('Email phải đúng định dạng VD: abcxyz@gmail.com')
            }

            let res = await registerUser(username, email, password)
            navigate('/auth/login')
            console.log('register', res)
            return toast.success('Đăng ký thành công')

        } catch (error) {
            console.log(error)
            if (!error && !error.response && !response.data) {
                return
            } else {
                const type = error.response.data.type
                if (type === 'email') {
                    setIsErrorEmail(true)
                }
                if (type === 'username') {
                    setIsErrorUsername(true)
                }

            }

            toast.error(error.response.data.message)
            console.log('err', error);
        }

    }

    return (
        <div className='w-[539px]  p-[44px] opacity-75 bg-white rounded-[40px] max-md:w-[360px] max-md:mt-[-40px]  max-md:m-auto' >
            <div className='flex flex-row  justify-between'>
                <div className='flex flex-col'>
                    <span className='text-black text-[21px] font-normal leading-normal'>
                        Welcome to
                        <span className='text-[#779341] font-semibold text-[21px] leading-normal ml-1'>
                            TODO
                        </span>
                    </span>
                    <span className='font-medium text-[55px] text-black leading-normal '>Sign in</span>
                </div>
                <Link to={`/auth/login`} className='flex flex-col'>
                    <span className='text-[13px] text-[#8D8D8D] font-normal leading-normal cursor-pointer hover:underline'> Have Account ?</span>
                    <span className='text-[13px] text-[#779341] font-normal leading-normal cursor-pointer hover:underline'>Sign in</span>
                </Link>
            </div>
            <div>
                {/* input */}
                <div>
                    {/* email */}
                    <div className='flex flex-col mt-[30px] '>
                        <label htmlFor="email" className='text-black text-[16px] font-semibold leading-normal mb-[8px]'>
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border rounded-[9px] focus:outline-none focus:border-[#4285F4]
                            py-[25px] px-[19px] h-[57px] focus:invalid:border-pink-500 invalid:border-pink-500
                             invalid:text-pink-600 ${isErrorEmail === true ? 'border-[red]' : ''}`}
                            type="email" id="email" placeholder='VD: abc@gmail.com' />
                    </div>
                    {/* username */}
                    <div className='flex flex-col mt-[30px] '>
                        <label htmlFor="username" className='text-black text-[16px] font-semibold leading-normal mb-[8px]'>
                            Name
                        </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className={`border rounded-[9px] focus:outline-none focus:border-[#4285F4]
                            py-[25px] px-[19px] h-[57px] focus:invalid:border-pink-500 invalid:border-pink-500
                             invalid:text-pink-600 ${isErrorUsername === true ? 'border-[red]' : ''}`}
                            type="text" id="username" placeholder='Enter your name' />
                    </div>

                    {/* password */}
                    <div className='flex flex-col mt-[30px] '>
                        <label htmlFor="password" className='text-black text-[16px] font-semibold leading-normal mb-[8px]'>
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border rounded-[9px] focus:outline-none focus:border-[#4285F4]
                            py-[25px] px-[19px] h-[57px]  ${isErrorPassword === true ? 'border-[red]' : ''}`}
                            type="password" id="password" placeholder='Password'
                        />

                    </div>
                </div>
                {/* button */}
                <div className="flex justify-end max-md:justify-center">
                    <button onClick={() => handleRegister()} className="w-[236px] h-[54px] bg-[#779341] text-white font-semibold text-[16px] rounded-[10px] mt-[40px]">Sign up</button>
                </div>
            </div>
        </div>
    )
}

