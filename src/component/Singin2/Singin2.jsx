import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";

const Singin2 = () => {
    const refemail = useRef(null)
    const [success, setsuccess] = useState('')
    const [register, setregister] = useState('')
    const hendlesingin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setregister('')
                if (result.user.emailVerified) {
                    setsuccess('login successfully')
                }
                else {
                    alert('please  varified your email')
                }

            })
            .catch(error => {
                console.log(error.message);
                setregister(error.user)
                setsuccess('')
            })

    }
    const hendleforget = () => {
        const email = refemail.current.value
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('check your email and change your password')
            })
            .catch(error => {
                console.log(error);
            })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sing In!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={hendlesingin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        ref={refemail}
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#"
                                            onClick={hendleforget}
                                            className="label-text-alt link link-hover">
                                            Forgot password?</a>
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
                                register && <p>{register}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Singin2;