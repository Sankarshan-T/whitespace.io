"use client";
import React, { use } from 'react';
import Header from '../_components/Header';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Editor = dynamic(() => import("../_components/Editor"), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>
});

function Workspace({ params }: { params: Promise<{ fileId: any }> }) {
    const resolvedParams = use(params);

    const fileData = useQuery(api.files.getFileById, {
        fileId: resolvedParams.fileId
    });

    const update = useMutation(api.files.updateDocument);

    const onChange = (content: string) => {
        update({
            _id: resolvedParams.fileId,
            document: content,
        });
    };

    return (
        <div>
            <Header />
            <div className='grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-62px)]'>
                {/* document */}
                <div className='h-full'>
                    {fileData ? (
                        <Editor
                            onChange={onChange}
                            initialContent={fileData.document}
                        />
                    ) : (
                        <div className="p-10">Loading document...</div>
                    )}
                </div>

                {/* canvas */}
                <div className='bg-rose-400 h-full'>
                    Canvas
                </div>
            </div>
        </div>
    )
}

export default Workspace;