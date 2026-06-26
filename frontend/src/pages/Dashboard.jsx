import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Plus,
    Search,
    Users,
    Star,
    Mail,
    TrendingUp,
    Inbox
} from "lucide-react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import LeadCard from "../components/LeadCard";
import Loader from "../components/Loader";
import LeadModal from "../components/LeadModal";
import EmailModal from "../components/EmailModal";

function Dashboard() {

    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [showEmailModal, setShowEmailModal] = useState(false);

    const [generatedEmail, setGeneratedEmail] = useState("");

    const [search, setSearch] = useState("");
    const [editingLead, setEditingLead] = useState(null);


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    const fetchLeads = async () => {

        try {

            const response = await api.get("/leads");

            setLeads(response.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchLeads();

    }, []);

    const filteredLeads = useMemo(() => {

        return leads.filter((lead) =>

            lead.company.toLowerCase().includes(search.toLowerCase()) ||

            lead.contact_name.toLowerCase().includes(search.toLowerCase()) ||

            lead.email.toLowerCase().includes(search.toLowerCase())

        );

    }, [leads, search]);

    const qualified = leads.filter(

        (lead) => lead.status === "Qualified"

    ).length;

    const generated = leads.filter(

        (lead) => lead.generated_email

    ).length;

    const avgScore = leads.length
        ? Math.round(

            leads.reduce(

                (acc, lead) =>

                    acc + Number(lead.lead_score || 0),

                0

            ) / leads.length

        )
        : 0;

    return (

        <div className="min-h-screen bg-neutral-50 text-neutral-900">

            {/* Scoped animations — no external deps */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
            `}</style>

            <Navbar onLogout={logout} />

            <main>

                <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">

                    {/* Header */}

                    <div className="flex flex-wrap items-end justify-between gap-4 fade-up">

                        <div>

                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">

                                Dashboard

                            </h1>

                            <p className="mt-1.5 text-sm text-neutral-500">

                                Manage, qualify and engage your leads with AI.

                            </p>

                        </div>

                        <button

                            onClick={() => setShowModal(true)}

                            className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]"

                        >

                            <Plus size={17} className="transition-transform duration-300 group-hover:rotate-90" />

                            Add Lead

                        </button>

                    </div>

                    {/* Statistics */}

                    <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-5">

                        <StatCard

                            title="Total Leads"

                            value={leads.length}

                            icon={<Users size={19}/>}

                            delay={0.04}

                        />

                        <StatCard

                            title="Qualified"

                            value={qualified}

                            icon={<Star size={19}/>}

                            delay={0.10}

                        />

                        <StatCard

                            title="Emails Generated"

                            value={generated}

                            icon={<Mail size={19}/>}

                            delay={0.16}

                        />

                        <StatCard

                            title="Average Score"

                            value={avgScore}

                            icon={<TrendingUp size={19}/>}

                            delay={0.22}

                        />

                    </div>

                    {/* Search */}

                    <div className="group mt-12 flex h-12 items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 shadow-sm transition focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-900/5 fade-up" style={{ animationDelay: "0.26s" }}>

                        <Search

                            className="shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-700"

                            size={18}

                        />

                        <input

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                            placeholder="Search company, contact or email..."

                            className="h-full w-full bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none"

                        />

                    </div>
{(showModal || editingLead) && (

    <LeadModal

        lead={editingLead}

        fetchLeads={fetchLeads}

        onClose={() => {

            setShowModal(false);

            setEditingLead(null);

        }}

    />

)}

                    {showEmailModal && (

                        <EmailModal

                            email={generatedEmail}

                            onClose={() => setShowEmailModal(false)}

                        />

                    )}

                    {/* Leads */}

                    <div className="mt-10">

                    {loading ? (

                        <Loader />

                    ) : filteredLeads.length === 0 ? (

                        <div className="rounded-xl border border-neutral-200 bg-white p-16 text-center shadow-sm fade-up">

                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                                <Inbox size={26} />
                            </div>

                            <h2 className="text-lg font-semibold text-neutral-900">

                                No leads found

                            </h2>

                            <p className="mt-1.5 text-sm text-neutral-500">

                                Get started by creating your first lead.

                            </p>

                            <button

                                onClick={() => setShowModal(true)}

                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"

                            >

                                <Plus size={17} />
                                Add Lead

                            </button>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredLeads.map((lead, i) => (

                              <div
                                key={lead.id}
                                className="fade-up"
                                style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s` }}
                              >
                                <LeadCard
    lead={lead}
    fetchLeads={fetchLeads}
    onEdit={(lead) => setEditingLead(lead)}
    onEmail={(email) => {
        setGeneratedEmail(email);
        setShowEmailModal(true);
    }}
/>
                              </div>

                            ))}

                        </div>

                    )}

                    </div>

                </div>

            </main>

        </div>

    );

}

function StatCard({

    title,

    value,

    icon,

    delay = 0

}) {

    return (

        <div
            className="fade-up rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{ animationDelay: `${delay}s` }}
        >

            <div className="flex items-center justify-between">

                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">

                    {icon}

                </span>

            </div>

            <p className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">

                {value}

            </p>

            <p className="mt-1 text-sm text-neutral-500">

                {title}

            </p>

        </div>

    );

}

export default Dashboard;
