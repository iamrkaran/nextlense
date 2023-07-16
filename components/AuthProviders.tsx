"use client"
import { useSession, signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthProviders() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProviders(providers);
            setLoading(false);
        };
        fetchProviders();
    }, [session]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <button
                onClick={() => signIn(providers.google.id)}
                className="w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Sign In
            </button>
        </div>

    );
}
