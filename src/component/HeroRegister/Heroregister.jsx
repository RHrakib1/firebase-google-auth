import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Heroregister = () => {
    const [heroregister, setheroregister] = useState('')
    const [sucess, setsucess] = useState('')
    const [show, setshow] = useState(false)


    const hendlehero = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const accept = e.target.trams.checked
        console.log(email, password, accept);
        // console.log('hit to the next');
        setheroregister('')




        if (password.length < 6) {
            setheroregister('pleasde entry your 6 carecter');
            return;

        }
        else if (!/[A-Z]/.test(password)) {
            setheroregister("please enter the larget word");
            return;
        }
        else if(!accept){
            setheroregister("please trams and condition completed")
            return
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsucess("From Fill Up Successfully")
                // email vartification
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('please cheack your email and varified')
                })
            })
            .catch(error => {
                console.error(error);
                setheroregister(error.message)
                setsucess('')
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={hendlehero}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='relative'>
                                    <input type={show ? "text" : "password"} placeholder="password" name='password' className="input input-bordered" required />
                                    <span className='absolute top-4 right-28' onClick={() => setshow(!show)} >
                                        {
                                            show ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" name='trams' id='trams' />
                                <label className='ml-2' htmlFor="trams">Accept Our <a href=''>Trams and Condition</a></label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register now</button>
                            </div>
                        </form>
                        {
                            heroregister && <p className='text-rose-500 '>{heroregister}</p>
                        }
                        {
                            sucess && <p className='text-green-600 font-bold'>{sucess}</p>
                        }
                        <p>Allready have an account?<a href="/login">Log In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Heroregister;