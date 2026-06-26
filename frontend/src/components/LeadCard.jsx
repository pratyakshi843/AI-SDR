import {
    Building2,
    Mail,
    User,
    Sparkles,
    Trash2,
    Pencil,
    Eye
} from "lucide-react";

import api from "../api/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function LeadCard({

    lead,
    fetchLeads,
    onEdit,
    onEmail

}) {

    const deleteLead = async () => {

        const result = await Swal.fire({

            title: "Delete Lead?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b"

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/leads/${lead.id}`);

            toast.success("Lead deleted");

            fetchLeads();

        }

        catch (err) {

            toast.error("Delete failed");

        }

    };

    const qualifyLead = async () => {

        try {

            toast.loading("AI is qualifying lead...",{

                id:"qualify"

            });

            await api.post(`/ai/qualify/${lead.id}`);

            toast.success("Lead Qualified!",{

                id:"qualify"

            });

            fetchLeads();

        }

        catch{

            toast.error("Qualification Failed",{

                id:"qualify"

            });

        }

    };

    const generateEmail = async () => {

        try{

            toast.loading("Generating Email...",{

                id:"email"

            });

            const response = await api.post(

                `/ai/generate-email/${lead.id}`

            );

            toast.success("Email Generated!",{

                id:"email"

            });

            await fetchLeads();

            if(onEmail){

                onEmail(response.data.generated_email);

            }

        }

        catch{

            toast.error("Generation Failed",{

                id:"email"

            });

        }

    };
    return (

        <div className="group flex h-full flex-col rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md">

            {/* Header */}

            <div className="flex items-start justify-between gap-4 p-6">

                <div className="flex min-w-0 items-center gap-3.5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white">

                        <Building2 size={22}/>

                    </div>

                    <div className="min-w-0">

                        <h2 className="truncate text-lg font-semibold tracking-tight text-neutral-900">

                            {lead.company}

                        </h2>

                        <p className="mt-0.5 truncate text-sm text-neutral-500">

                            Lead profile

                        </p>

                    </div>

                </div>

                {/* Score */}

                <div className="flex shrink-0 flex-col items-center">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-lg font-semibold text-neutral-900">

                        {lead.lead_score || "--"}

                    </div>

                    <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">

                        AI Score

                    </span>

                </div>

            </div>

            <div className="border-t border-neutral-100"></div>

            {/* Body */}

            <div className="flex flex-1 flex-col p-6">

                <div className="space-y-4">

                    <div className="flex items-center gap-3">

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                            <User size={18}/>
                        </span>

                        <div className="min-w-0">

                            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">

                                Contact

                            </p>

                            <p className="truncate text-[15px] font-medium text-neutral-800">

                                {lead.contact_name}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                            <Mail size={18}/>
                        </span>

                        <div className="min-w-0">

                            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">

                                Email

                            </p>

                            <p className="truncate text-[15px] font-medium text-neutral-800">

                                {lead.email}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-5">

    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-sm font-medium text-neutral-700">

        <span
            className={`h-2 w-2 rounded-full
            ${
                lead.status === "Qualified"
                ? "bg-emerald-500"
                : lead.status === "Email Generated"
                ? "bg-sky-500"
                : "bg-amber-500"
            }`}
        ></span>

        {lead.status}

    </span>

</div>

{
    lead.reason && (

        <div className="mt-5 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-4">

            <div className="flex items-center gap-2 mb-2">

                <Sparkles
                    size={17}
                    className="text-indigo-600"
                />

                <h3 className="text-sm font-semibold text-indigo-700">

                    AI Insight

                </h3>

            </div>

            <p className="text-sm leading-6 text-slate-700 break-words whitespace-normal">
    {lead.reason}
</p>

        </div>

    )
}

                {/* Spacer pushes the action footer to the bottom for equal-height cards */}
                <div className="flex-1"></div>

                {/* Actions */}

                <div className="mt-6 space-y-3">

                    {lead.generated_email && (

                        <button

                            onClick={() => onEmail(lead.generated_email)}

                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-[15px] font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"

                        >

                            <Eye size={17}/>

                            View Generated Email

                        </button>

                    )}

                    {/* Primary actions */}

                    <div className="grid grid-cols-2 gap-3">

                        <button

                            onClick={qualifyLead}

                            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 text-[15px] font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]"

                        >

                            <Sparkles size={17}/>

                            Generate Score

                        </button>

                        <button

                            onClick={generateEmail}

                            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-[15px] font-medium text-neutral-800 transition hover:bg-neutral-50 active:scale-[0.98]"

                        >

                            <Sparkles size={17}/>

                           Generate Email

                        </button>

                    </div>

                </div>

                {/* Secondary actions */}

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">

                    <button

                        onClick={() => onEdit?.(lead)}

                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"

                    >

                        <Pencil size={15}/>

                        Edit

                    </button>

                    <button

                        onClick={deleteLead}

                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium text-neutral-600 transition hover:bg-red-50 hover:text-red-600"

                    >

                        <Trash2 size={15}/>

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default LeadCard;
