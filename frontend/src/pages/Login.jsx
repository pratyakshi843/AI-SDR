import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Sparkles,
    ShieldCheck,
    Eye,
    EyeOff,
    Loader2,
    Mail,
    Lock,
    ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(

                "/auth/login",

                form

            );

            localStorage.setItem(

                "token",

                response.data.access_token

            );

            toast.success("Welcome back!");

            navigate("/dashboard");

        }

        catch (err) {

            toast.error(

                err.response?.data?.detail ||

                "Invalid email or password."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex bg-white text-neutral-900">

            {/* Scoped animations — no external deps */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes drift {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(20px,-20px); }
                }
                .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
                .drift { animation: drift 18s ease-in-out infinite; }
            `}</style>

            {/* Left Section */}

            <div className="relative hidden lg:flex w-1/2 flex-col justify-between overflow-hidden bg-neutral-900 p-12 text-white">

                {/* grid overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                ></div>

                {/* soft neutral glows */}
                <div className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl drift"></div>
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl drift" style={{ animationDelay: "5s" }}></div>

                {/* Brand */}

                <div className="relative flex items-center gap-3 fade-up">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-900">

                        <Sparkles size={20} />

                    </div>

                    <div className="leading-tight">

                        <p className="font-semibold tracking-tight">

                            AI SDR CRM

                        </p>

                        <p className="text-sm text-neutral-400">

                            Sales Intelligence Platform

                        </p>

                    </div>

                </div>

                {/* Middle */}

                <div className="relative max-w-md fade-up" style={{ animationDelay: "0.1s" }}>

                    <h2 className="text-3xl font-semibold leading-snug tracking-tight">

                        Qualify leads, generate personalized outreach, and manage your pipeline with AI.

                    </h2>

                    <div className="mt-10 space-y-4">

                        {[
                            "Secure JWT Authentication",
                            "AI Lead Qualification",
                            "AI Email Generation",
                            "PostgreSQL + FastAPI Backend"
                        ].map((feature, i) => (

                            <div
                                key={feature}
                                className="flex items-center gap-3 text-neutral-300 fade-up"
                                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                            >

                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                    <ShieldCheck size={15} className="text-white" />
                                </span>

                                <span className="text-sm">{feature}</span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Bottom */}

                <p className="relative text-xs text-neutral-500 fade-up" style={{ animationDelay: "0.5s" }}>

                    © 2026 AI SDR CRM — All rights reserved.

                </p>

            </div>

            {/* Right Section */}

            <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 sm:px-12">

                <div className="w-full max-w-md fade-up">

                    {/* Mobile brand */}
                    <div className="lg:hidden mb-10 flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white">
                            <Sparkles size={18} />
                        </div>
                        <span className="text-sm font-semibold tracking-tight text-neutral-900">AI SDR CRM</span>
                    </div>

                    <div className="mb-8">

                        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">

                            Welcome back

                        </h2>

                        <p className="mt-2 text-sm text-neutral-500">

                            Sign in to continue to your dashboard.

                        </p>

                    </div>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-6"

                    >

                        <div className="group">

                            <label className="mb-2 block text-sm font-medium text-neutral-700">

                                Email address

                            </label>

                            <div className="flex h-12 items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5">

                                <Mail size={18} className="shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-700" />

                                <input

                                    type="email"

                                    name="email"

                                    value={form.email}

                                    onChange={handleChange}

                                    placeholder="you@example.com"

                                    className="h-full w-full bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none"

                                />

                            </div>

                        </div>

                        <div className="group">

                            <label className="mb-2 block text-sm font-medium text-neutral-700">

                                Password

                            </label>

                            <div className="flex h-12 items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5">

                                <Lock size={18} className="shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-700" />

                                <input

                                    type={showPassword ? "text" : "password"}

                                    name="password"

                                    value={form.password}

                                    onChange={handleChange}

                                    placeholder="••••••••"

                                    className="h-full w-full bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none"

                                />

                                <button

                                    type="button"

                                    onClick={() =>

                                        setShowPassword(!showPassword)

                                    }

                                    className="-mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"

                                >

                                    {

                                        showPassword

                                            ?

                                            <EyeOff size={18}/>

                                            :

                                            <Eye size={18}/>

                                    }

                                </button>

                            </div>

                        </div>

                        <div className="pt-2">

                            <button

                                disabled={loading}

                                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-60 disabled:hover:bg-neutral-900"

                            >

                                {

                                    loading ?

                                    <>

                                        <Loader2

                                            className="animate-spin"

                                            size={16}

                                        />

                                        Logging In...

                                    </>

                                    :

                                    <>
                                        Login
                                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </>

                                }

                            </button>

                        </div>

                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-500">

                        Don't have an account?

                        <Link

                            to="/register"

                            className="ml-1.5 font-medium text-neutral-900 underline-offset-4 hover:underline"

                        >

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;
