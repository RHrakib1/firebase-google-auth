import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";


const SingUp = () => {
    const [success, setsucces] = useState('')
    const [sing, setsing] = useState('')
    const useemail = useRef(null)
    const hendleform = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setsing('')
                console.log(result.user);
                if (result.user.emailVerified) {
                    setsucces('loged in successfull')
                }
                else {
                    alert('please varified your email')

                }

            })
            .catch(error => {
                console.log(error);
                setsing(error.message)
                setsucces('')
            })

    }
    const hendleclick = () => {
        const email = useemail.current.value
        if (!email) {
            console.log("enter yout email", email);
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log("please write a valid email");
            return

        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("please your email checked")
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
                        <form onSubmit={hendleform}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={useemail} type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required />
                                <label className="label">
                                    <a onClick={hendleclick} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                        {
                            sing && <p className="text-white">{sing}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;