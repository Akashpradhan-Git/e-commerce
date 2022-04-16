
import style from '../styles/login.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/auth/authSlice';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Spinner from '../components/util/Spinner';

import jwt from 'jsonwebtoken'

const loginUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);


    const decodeToken = (user) => {
        const decodeToken = jwt.decode(user)
        return decodeToken;
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (user) {
            const role = decodeToken(user)
            switch (role.sub) {
                case "admin":
                    router.push("/admin/dashboard")
                    break;
                case "user":
                    router.push("/user/dashboard")
                    break;
                default:
                    break;
            }
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            userName: email,
            password: password
        }
        if (email !== '' && password !== '') {
            dispatch(login(userData))
        }
        else {
            toast.error('Please Input userName and Password!');
        }

    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Head>
                <title>E-commerces</title>
            </Head>
            <div className={style.main}>
                <div className={style.container} id="container">

                    <div className={`${style.form_container} ${style.sign_in_container}`}>
                        <form className={style.form}>
                            <h1 className={style.h1}>Sign in</h1>
                            <div className={style.social_container}>
                                <a href="#" className={style.social}><FaFacebook /></a>
                                <a href="#" className={style.social}><FcGoogle /></a>
                                <a href="#" className={style.social}><FaLinkedin /></a>
                            </div>
                            <span>or use your account</span>
                            <input className={style.input} type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                            <input className={style.input} type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                            <a className={style.a} href="#">Forgot your password?</a>
                            <button type='submit' className={style.button} onClick={handleSubmit}>Sign In</button>
                        </form>
                    </div>
                    <div className={style.overlay_container}>
                        <div className={style.overlay}>
                            <div className={`${style.overlay_panel} ${style.overlay_right}`}>
                                <h1 className={style.h1}>Hello, Friend!</h1>
                                <p className={style.p}>Enter your personal details and start journey with us</p>
                                <button className={`${style.button} ${style.ghost}`} id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default loginUser