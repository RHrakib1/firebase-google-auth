
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "@firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";
const Login = () => {
    const [heroregister, setheroregister] = useState('')
    const [sucess, setsucess] = useState('')
    const emailref = useRef(null)

    const hendlelogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setheroregister('')
                console.log(result.user);
                if (result.user.emailVerified) {
                    setsucess("user loged in  successfully ")
                }
                else {
                    alert('please varified your gmail account')
                }
            })
            .catch(error => {
                console.log(error.message);
                setheroregister(error.message)
                setsucess('')
            })
    }
    const hendlePasswordReset = () => {
        const email = emailref.current.value;
        console.log(email);
        if (!email) {
            console.log("enter your email address", emailref.current.value);
            return
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log("please write a valid email");
            return

        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('email your check')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={hendlelogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    ref={emailref}
                                    type="text"
                                    placeholder="email"
                                    name='email'
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a
                                        className="label-text-alt link link-hover"
                                        onClick={hendlePasswordReset}
                                    >Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login now</button>
                            </div>
                        </form>
                        {
                            heroregister && <p className='text-rose-500 '>{heroregister}</p>
                        }
                        {
                            sucess && <p className='text-green-600 font-bold'>{sucess}</p>
                        }
                        <p>New to this website?<a href="/heroregister">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;