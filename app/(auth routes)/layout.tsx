"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function UpPageLayout({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        router.refresh();
        setLoading(false);
    }, [router]);
    return children;
}
