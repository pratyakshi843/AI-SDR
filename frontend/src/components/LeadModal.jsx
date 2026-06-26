import { useState } from "react";

import {
    X,
    Building2,
    User,
    Mail,
    PlusCircle,
    Loader2
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

function LeadModal({
    lead,
    onClose,
    fetchLeads

}) {

  const [company, setCompany] = useState(
    lead?.company || ""
);

const [contactName, setContactName] = useState(
    lead?.contact_name || ""
);

const [email, setEmail] = useState(
    lead?.email || ""
);

    const [loading,setLoading]=useState(false);

    const handleSubmit=async(e)=>{

        e.preventDefault();

        if(!company || !contactName || !email){

            toast.error("Please fill all fields.");

            return;

        }

        try{

            setLoading(true);

           if (lead) {

    await api.put(`/leads/${lead.id}`, {

        company,
        contact_name: contactName,
        email

    });

    toast.success("Lead Updated Successfully");

} else {

    await api.post("/leads", {

        company,
        contact_name: contactName,
        email

    });

    toast.success("Lead Created Successfully 🚀");

}

            await fetchLeads();

            onClose();

        }

        catch(err){

            toast.error(

                err.response?.data?.detail ||

                "Failed to create lead"

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fadeIn">

            {/* Scoped animations — no external deps */}
            <style>{`
                @keyframes modalPop {
                    from { opacity: 0; transform: translateY(12px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .modal-pop { animation: modalPop 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
            `}</style>

            <div className="modal-pop w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                            <Building2 size={20} />
                        </div>

                        <div>

                            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">

                                {lead ? "Edit Lead" : "Create New Lead"}

                            </h2>

                            <p className="mt-0.5 text-sm text-neutral-500">

                                {lead
        ? "Update the lead information"
        : "Add a company to your pipeline"}

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"

                    >

                        <X size={18}/>

                    </button>

                </div>

                {/* Form */}

                <form

                    onSubmit={handleSubmit}

                    className="space-y-5 px-6 py-6"

                >

                    <div className="group">

                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">

                            Company

                        </label>

                        <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5">

                            <Building2 size={17} className="text-neutral-400 transition-colors group-focus-within:text-neutral-700"/>

                            <input

                                value={company}

                                onChange={(e)=>setCompany(e.target.value)}

                                placeholder="Google"

                                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"

                            />

                        </div>

                    </div>

                    <div className="group">

                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">

                            Contact name

                        </label>

                        <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5">

                            <User size={17} className="text-neutral-400 transition-colors group-focus-within:text-neutral-700"/>

                            <input

                                value={contactName}

                                onChange={(e)=>setContactName(e.target.value)}

                                placeholder="Sundar Pichai"

                                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"

                            />

                        </div>

                    </div>

                    <div className="group">

                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">

                            Email address

                        </label>

                        <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5">

                            <Mail size={17} className="text-neutral-400 transition-colors group-focus-within:text-neutral-700"/>

                            <input

                                type="email"

                                value={email}

                                onChange={(e)=>setEmail(e.target.value)}

                                placeholder="ceo@google.com"

                                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"

                            />

                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-2">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"

                        >

                            Cancel

                        </button>

                        <button

                            disabled={loading}

                            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-60 disabled:hover:bg-neutral-900"

                        >

                           {
loading ?

<>
<Loader2 size={16} className="animate-spin"/>
Saving...
</>

:

<>

<PlusCircle size={16}/>

{lead ? "Update Lead" : "Create Lead"}

</>

}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default LeadModal;
