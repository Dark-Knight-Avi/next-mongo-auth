'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user, {
                withCredentials: true,
            })
            toast.success(response.data.message)
            router.push('/profile')
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-black via-purple-900 to-violet-600">
                <div className=" md:w-auto w-[90%] p-8 rounded-xl  m-4 flex flex-col items-center shadow-lg border border-gray-400 opacity-90 ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 ">
                        <h1 className="font-semibold text-3xl text-gray-200 m-2">{loading ? "Logging in..." : "Login"}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">

                        <div className="">
                            <label htmlFor="email" className="m-1 text-lg block text-gray-200 text-semibold">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="border-b border-gray-200 focus:outline-none  text-gray-200 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                                value={user.email}
                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                }}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="m-1 block text-lg text-gray-200 text-semibold">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="border-b border-gray-200 focus:outline-none  text-gray-200 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                                value={user.password}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                }}
                            />
                        </div>
                    </div>
                    <div className="text-center mt-7">
                        <button disabled={buttonDisabled} onClick={onLogin} className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-t from-stone-900 via-purple-900 to-violet-600  font-medium ">
                            Login
                        </button>
                    </div>
                </div>
                <div className="text-center my-6 flex flex-col">
                    Don't have an account?
                    <Link
                        href={'/signup'}
                        className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1"
                    >
                        Visit Sign up
                    </Link>
                </div>
            </div>

        </>
    );
}

export default LoginPage;