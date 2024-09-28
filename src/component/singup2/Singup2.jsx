import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import auth from "../Firebase/Firebase.config";

const Singup2 = () => {
    const [registerNow, setregisterNow] = useState('')
    const [show, setshow] = useState('')
    const [success, setsuccess] = useState('')
    const hendlesingup2 = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const condition = e.target.trams.checked
        console.log(email, password);
        setregisterNow('')
        setsuccess('')

        if (password.length < 6) {
            setregisterNow('please enter 6 digit up on password')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setregisterNow('please entry password with capital latter')
            return
        }
        else if (!condition) {
            setregisterNow('please aggre our condition')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsuccess('successfully sing up user wellcome')
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("check your email account")
                    })
            })
            .catch(error => {
                console.log("that is error:", error.message);
                setregisterNow(error.message)
                setsuccess('')
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sing Up!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={hendlesingup2}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />


                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={show ? 'password' : 'text'}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required />
                                    <span className="absolute top-4 right-28" onClick={() => setshow(!show)}>
                                        {
                                            show ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </span>
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <div>
                                    <input type="checkbox" name="trams" id="trams" />
                                    <label className="ml-2" htmlFor="trams">Accept our <a href="">Trams and condition</a></label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            registerNow && <p className="text-rose-400 ">{registerNow}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singup2;