"use client";

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Sidebar from './_components/Sidebar';
import { FilesListContext } from '@/app/_context/FilesListContex';

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    const [filesList_, setFilesList_] = useState();

    useEffect(() => {
        user && checkTeam();
    }, [user]);

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });

        if (!result?.length) {
            router.push('/teams/create/')
        }
    }

    return (
        <FilesListContext.Provider value={{ filesList_, setFilesList_ }}>
            <div className='flex justify-start'>
                <div className='h-screen w-72 sticky'>
                    <Sidebar />
                </div>
                <div className="mr-[calc(100vw-288px)] min-w-[calc(100vw-288px)]">
                    {children}
                </div>
            </div>
        </FilesListContext.Provider>
    )
}

export default DashboardLayout;