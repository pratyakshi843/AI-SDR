import {
    Copy,
    X,
    Mail,
    Sparkles,
    UserCircle2
} from "lucide-react";

import toast from "react-hot-toast";

function EmailModal({

    email,
    onClose

}) {

    const copyEmail = async () => {

        try {

            await navigator.clipboard.writeText(email);

            toast.success("Email copied to clipboard!");

        }

        catch {

            toast.error("Failed to copy email.");

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fadeIn">

            {/* Scoped animations — no external deps */}
            <style>{`
                @keyframes modalPop {
                    from { opacity: 0; transform: translateY(14px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .modal-pop { animation: modalPop 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
            `}</style>

            <div className="modal-pop flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">

                            <Mail size={20} />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">

                                AI Generated Email

                            </h2>

                            <p className="mt-0.5 text-sm text-neutral-500">

                                Generated using Gemini AI

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"

                    >

                        <X size={18} />

                    </button>

                </div>

                {/* Email */}

                <div className="overflow-y-auto bg-neutral-50 p-5 sm:p-6">

                    <div className="rounded-xl border border-neutral-200 bg-white">

                        {/* Email Header */}

                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 p-5">

                            <div className="flex gap-3">

                                <UserCircle2

                                    size={44}

                                    className="text-neutral-300"

                                />

                                <div>

                                    <h3 className="font-semibold text-neutral-900">

                                        AI SDR Assistant

                                    </h3>

                                    <p className="text-sm text-neutral-500">

                                        ai-sdr@company.ai

                                    </p>

                                    <p className="mt-0.5 text-xs text-neutral-400">

                                        Generated just now

                                    </p>

                                </div>

                            </div>

                            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">

                                <Sparkles size={13} />

                                AI Generated

                            </div>

                        </div>

                        {/* Email Body */}

                        <div className="p-5 sm:p-6">

                            <div

                                className="whitespace-pre-wrap text-sm leading-7 text-neutral-700"

                            >

                                {email}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 bg-white px-6 py-4">

                    <p className="text-xs text-neutral-500">

                        Generated using your AI SDR platform.

                    </p>

                    <div className="flex gap-3">

                        <button

                            onClick={onClose}

                            className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"

                        >

                            Close

                        </button>

                        <button

                            onClick={copyEmail}

                            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]"

                        >

                            <Copy size={16} />

                            Copy Email

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmailModal;
