"use client";
import React, { use, useState } from 'react';
import Header from '../_components/Header';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { WorkspaceMode, WorkspaceState } from '@/types/workspacetypes';
const Editor = dynamic(() => import("../_components/Editor"), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>
});

const Canvas = dynamic(() => import("../_components/Canvas"), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center">Loading Canvas...</div>
});

function Workspace({ params }: { params: Promise<{ fileId: any }> }) {
    const resolvedParams = use(params);

    const fileData = useQuery(api.files.getFileById, {
        fileId: resolvedParams.fileId,
    });

    const updateDocument = useMutation(api.files.updateDocument);

    const onDocumentChange = (content: string) => {
        updateDocument({
            _id: resolvedParams.fileId,
            document: content,
        });
    };

    const [workspaceState, setWorkspaceState] = useState<WorkspaceState>({
        mode: WorkspaceMode.Split,
    });

    return (
        <div>
            <Header
                setWorkspaceState={setWorkspaceState}
                workspaceState={workspaceState}
            />
            {workspaceState.mode === WorkspaceMode.Document &&
                <div className='grid grid-cols-1 lg:grid-cols-1 h-[calc(100vh-62px)] w-screen'>
                    {/* document */}
                    <div className='h-full w-full'>
                        {fileData ? (
                            <Editor
                                onChange={onDocumentChange}
                                initialContent={fileData.document}
                            />
                        ) : (
                            <div className="p-10">Loading document...</div>
                        )}
                    </div>

                    {/* canvas */}
                    <div className='border-l-2 h-full hidden'>
                        {fileData ? (
                            <Canvas fileId={resolvedParams.fileId} fileData={fileData} />
                        ) : (
                            <div className="p-10">Loading whiteboard...</div>
                        )}
                    </div>
                </div>
            }
            {workspaceState.mode === WorkspaceMode.Split &&
                <div className='grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-62px)]'>
                    {/* document */}
                    <div className='h-full'>
                        {fileData ? (
                            <Editor
                                onChange={onDocumentChange}
                                initialContent={fileData.document}
                            />
                        ) : (
                            <div className="p-10">Loading document...</div>
                        )}
                    </div>

                    {/* canvas */}
                    <div className='border-l-2 h-full'>
                        {fileData ? (
                            <Canvas fileId={resolvedParams.fileId} fileData={fileData} />
                        ) : (
                            <div className="p-10">Loading whiteboard...</div>
                        )}
                    </div>
                </div>
            }
            {workspaceState.mode === WorkspaceMode.Canvas &&
                <div className='grid grid-cols-1 lg:grid-cols-1 h-[calc(100vh-62px)] w-screen'>
                    {/* document */}
                    <div className='h-full hidden'>
                        {fileData ? (
                            <Editor
                                onChange={onDocumentChange}
                                initialContent={fileData.document}
                            />
                        ) : (
                            <div className="p-10">Loading document...</div>
                        )}
                    </div>

                    {/* canvas */}
                    <div className='border-l-2 h-full w-full'>
                        {fileData ? (
                            <Canvas fileId={resolvedParams.fileId} fileData={fileData} />
                        ) : (
                            <div className="p-10">Loading whiteboard...</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Workspace;