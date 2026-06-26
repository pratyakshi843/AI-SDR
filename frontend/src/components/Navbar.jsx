import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import {
    LayoutDashboard,
    LogOut,
    Sparkles,
    UserCircle2
} from "lucide-react";

function Navbar({ onLogout }) {

    const [userName, setUserName] = useState("User");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const decoded = jwtDecode(token);

            console.log(decoded);

            setUserName(

                decoded.full_name ||

                decoded.name ||

                decoded.email ||

                decoded.sub ||

                "User"

            );

        }

        catch (err) {

            console.log(err);

        }

    }, []);

    return (

        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">

            <div className="mx-auto max-w-7xl px-5 sm:px-8">

                <div className="flex h-16 items-center justify-between">

                    {/* Left */}

                    <div className="flex items-center gap-8">

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white transition-transform duration-300 hover:scale-105">

                                <Sparkles size={18} />

                            </div>

                            <div className="leading-tight">

                                <p className="text-sm font-semibold tracking-tight text-neutral-900">

                                    AI SDR

                                </p>

                                <p className="text-[11px] text-neutral-500">

                                    Sales Intelligence

                                </p>

                            </div>

                        </div>

                        <nav className="hidden md:flex items-center gap-1">

                            <button className="inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200">

                                <LayoutDashboard size={16} />

                                Dashboard

                            </button>

                        </nav>

                    </div>

                    {/* Right */}

                    <div className="flex items-center gap-3">

                        <div className="hidden sm:flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2 shadow-sm">

                            <div className="relative">

                                <UserCircle2
                                    size={34}
                                    className="text-neutral-400"
                                />

                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>

                            </div>

                            <div>

                                <p className="font-semibold text-neutral-800">

                                    {userName}

                                </p>

                                <p className="text-xs text-neutral-500">

                                    Signed in

                                </p>

                            </div>

                        </div>

                        <button

                            onClick={onLogout}

                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"

                        >

                            <LogOut size={17} />

                            <span className="hidden sm:inline">

                                Logout

                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;