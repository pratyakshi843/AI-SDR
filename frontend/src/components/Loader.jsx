function Loader() {
    return (
        <div className="flex flex-col items-center justify-center py-20">

            {/* Scoped animations — no external deps */}
            <style>{`
                @keyframes loaderSpin { to { transform: rotate(360deg); } }
            `}</style>

            <div
                className="h-9 w-9 rounded-full border-2 border-neutral-200 border-t-neutral-900"
                style={{ animation: "loaderSpin 0.7s linear infinite" }}
            ></div>

            <p className="mt-4 text-sm font-medium text-neutral-500">

                Loading...

            </p>

        </div>
    );
}

export default Loader;
