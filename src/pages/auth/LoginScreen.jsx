import { Link, useNavigate } from "react-router-dom"
import { login } from "../../services/authAPI/userService"
import { useState } from "react"
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { loginStart, loginSuccess, loginFail } from "../../redux/userSlice"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        dispatch(loginStart())
        try {
            if (password === '' && email === '') {
                setIsErrorPassword(true)
                setIsErrorEmail(true)
                return
            }
            if (email === '') {
                setIsErrorEmail(true)
                return
            } else {
                setIsErrorEmail(false)
            }
            if (password === '') {
                setIsErrorPassword(true)
                return
            } else {
                setIsErrorPassword(false)
            }

            let res = await login(email, password)
            dispatch(loginSuccess(res.data))
            toast.success('đăng nhập thành công')
            localStorage.setItem('accessToken', res.data.accessToken)
            navigate('/')
            console.log('login', res.data)
        } catch (error) {

            const type = error.response.data.type
            if (type === 'email') {
                setIsErrorEmail(true)
            } else {
                setIsErrorEmail(false)
            }
            if (type === 'password') {
                setIsErrorPassword(true)
            } else {
                setIsErrorPassword(false)
            }
            if (error && error.response) {
                toast.error(error.response.data.message)

            }
            dispatch(loginFail())
            console.log('res', error)

        }
    }

    return (
        <div className='w-[539px] p-[44px] opacity-75 bg-white rounded-[40px] max-md:w-[360px] max-md:mt-[-40px]  max-md:m-auto' >
            <div className='flex flex-row  justify-between'>
                <div className='flex flex-col'>
                    <span className='text-black text-[21px]  font-normal leading-normal'>
                        Welcome to
                        <span className='text-[#779341] font-semibold text-[21px] leading-normal ml-1'>
                            TODO
                        </span>
                    </span>
                    <span className='font-medium text-[55px] text-black leading-normal '>Sign in</span>
                </div>
                <Link to={`/auth/register`} className='flex flex-col'>
                    <span className='text-[13px] text-[#8D8D8D] font-normal leading-normal cursor-pointer hover:underline '> No Account ?</span>
                    <span className='text-[13px] text-[#779341] font-normal leading-normal cursor-pointer hover:underline'>Sign up</span>
                </Link>
            </div>
            <div>
                {/* input */}
                <div>
                    {/* email */}
                    <div className='flex flex-col mt-[30px] max-md:mt-[10px]'>
                        <label htmlFor="email" className='text-black text-[16px] font-semibold leading-normal mb-[13px]'>
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border rounded-[9px] focus:outline-none focus:border-[#4285F4]
                            py-[25px] px-[19px] h-[57px] focus:invalid:border-pink-500 invalid:border-pink-500
                             invalid:text-pink-600 ${isErrorEmail === true ? 'border-[red]' : ''}`}
                            type="email" id="email" placeholder='VD: abc@gmail.com' />
                    </div>

                    {/* password */}
                    <div className='flex flex-col mt-[30px] '>
                        <label htmlFor="password" className='text-black text-[16px] font-semibold leading-normal mb-[13px]'>
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border rounded-[9px] focus:outline-none focus:border-[#4285F4]
                            py-[25px] px-[19px] h-[57px] ${isErrorPassword === true ? 'border-[red]' : ''}`}
                            type="password" id="password" placeholder='Password'
                        />
                        <span className=" flex justify-end mt-[12px] text-[#4285F4] text-[13px] font-normal 
                            leading-normal cursor-pointer hover:underline">
                            Forgot password
                        </span>
                    </div>
                </div>
                {/* button */}
                <div className="flex justify-end max-md:justify-center ">
                    <button onClick={() => handleLogin()} className="w-[236px] h-[54px] bg-[#779341] text-white font-semibold text-[16px] rounded-[10px] mt-[50px] max-md:mt-[20px] ">Sign in</button>
                </div>
            </div>
        </div>
    )
}
