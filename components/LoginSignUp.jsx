'use client'
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import UserMsg from './UserMsg';



function LoginPage() {
    const [user, setUser] = useState({ email: '', password: '' })
    const router = useRouter()
    const [loading, error] = useAuthState(auth);





    const handleChange = ({ target }) => {
        const { value, name: filed } = target
        setUser(prev => ({ ...prev, [filed]: value }))
    }

    const onSignUp = async (ev) => {
        ev.preventDefault()

        const { email, password } = user
        try {
            const userAuth = await createUserWithEmailAndPassword(auth, email, password)
            sessionStorage.setItem('user', JSON.stringify({ user: true }))
            toast.success('Login Successfully ')
            if (userAuth) router.push('/')

        } catch (err) {
            toast.error("This user already exists")
        }

    }
    const onSignIn = async (ev) => {
        ev.preventDefault()
        const { email, password } = user

        try {
            const userAuth = await signInWithEmailAndPassword(auth, email, password)
            sessionStorage.setItem('user', JSON.stringify({ user: true }))
            toast.success('Login Successfully ')

            if (userAuth) router.push('/')

        } catch (err) {
            toast.error("email or password is wrong")
        }
    }

    if (loading) return
    return (

        <section className="login-bg text-white">
            <div className="flex flex-col shadow-2xl  items-center justify-center rounded-md px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                <div className="w-full bg-[#111] rounded-lg shadow-2xl  md:mt-0 max-w-[550px] xl:p-0 ">
                    <div className="flex items-center mb-6 mx-auto justify-center pt-8 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://playlist-kqq9.onrender.com/static/media/logo-pic-white.0b8c5ac6eec4a813c1c2.png" alt="logo" />
                        <p>Copyfy</p>

                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    // value={user.email}
                                    onChange={handleChange}
                                    className="  text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 bg-[#3a3a3a] border-none dark:text-white "
                                    placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    // value={user.password}
                                    onChange={handleChange}
                                    className="  text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 bg-[#3a3a3a] border-none dark:text-white " required="" />
                            </div>

                            <button onClick={onSignIn} type="submit" className="w-full text-white p-2 rounded-lg bg-[#1aa049] hover:bg-[#1db954] ">Sign in</button>

                            <p onClick={onSignUp} className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* <UserMsg /> */}

        </section>
    )
}

export default LoginPage