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
            console.log(providers);
            setLoading(false);  
        };
        fetchProviders();
    }, [session]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col  items-center justify-center  py-2">
            <button 
                onClick={() => signIn(providers.google.id)}
                className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none">
                Sign In
            </button>
        </div>
    );
}
