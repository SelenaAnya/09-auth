"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/lib/store/authStore";

export default function UpPageLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        clearIsAuthenticated();
        router.refresh()
        setIsLoading(false)
    }, [router, clearIsAuthenticated])

    return <>
        {isLoading ? <div>Please wait... it will load soon...</div> : children}    
    </>
}
