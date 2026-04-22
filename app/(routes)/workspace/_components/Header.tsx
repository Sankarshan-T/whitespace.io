"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WorkspaceMode, WorkspaceState } from '@/types/workspacetypes';
import { Link } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface HeaderProps {
    setWorkspaceState: (newState: WorkspaceState) => void;
    workspaceState: WorkspaceState;
}

function Header({
    setWorkspaceState,
    workspaceState
}: HeaderProps) {

    return (
        <div className='p-3 border-b flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                <Image
                    src={'/logo.svg'}
                    alt='logo'
                    height={40}
                    width={40}
                />
                <h2 className='text-xl'>Filename</h2>
            </div>
            <div className='flex items-center gap-x-2'>
                <Button
                    variant={"outline"}
                    onClick={() => setWorkspaceState({ mode: WorkspaceMode.Document })}
                    className={cn(workspaceState.mode === WorkspaceMode.Document && 'bg-blue-100 border-blue-600 dark:bg-blue-900/20')}
                >
                    Document
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => setWorkspaceState({ mode: WorkspaceMode.Split })}
                    className={cn(workspaceState.mode === WorkspaceMode.Split && 'bg-blue-100 border-blue-600 dark:bg-blue-900/20')}
                >
                    Split
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => setWorkspaceState({ mode: WorkspaceMode.Canvas })}
                    className={cn(workspaceState.mode === WorkspaceMode.Canvas && 'bg-blue-100 border-blue-600 dark:bg-blue-900/20')}
                >
                    Canvas
                </Button>
            </div>
            <Button size={'lg'}>
                Share
                <Link className='h-4 w-4' />
            </Button>
        </div>
    )
}

export default Header;