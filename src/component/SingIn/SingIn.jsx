import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import auth from "../Firebase/Firebase.config";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const SingIn = () => {
    const [singin, setsingin] = useState('')
    const [success, setsucces] = useState('')
    const [show, setshow] = useState(false)


    const hendlesingin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const condition = e.target.trams.checked
        console.log(email, password, condition);
        setsingin('')
        setsucces('')



        if (password.length < 6) {
            setsingin("please entry your 6 carecter");
            return

        }
        else if (!/[A-Z]/.test(password)) {
            setsingin('please enter capital latter your password')
            return
        }
        else if (!condition) {
            setsingin('please aggree our condition ')
            return
        }



        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsucces('from filup successfully')
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('please check your email' )
                })
            })
            .catch(error => {
                console.log(error);
                setsucces('')
                setsingin(error.message)
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
                        <form onSubmit={hendlesingin} >
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
                                    
                                    <input type={show ? 'text' : "password"} placeholder="password" name="password" className="input input-bordered" required />
                                    <span className="absolute top-4 right-28" onClick={() => setshow(!show)}>
                                        {
                                            show ? <FaEye /> : <FaEyeSlash />

                                        }
                                    </span>
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <div>
                                    <input type="checkbox" name="trams" id="trams" />
                                    <span className="ml-2">accept our <a href="">Trams and condition</a></span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                    {
                        success && <p className="text-green-600">{success}</p>
                    }
                    {
                        singin && <p className="text-white">{singin}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SingIn;