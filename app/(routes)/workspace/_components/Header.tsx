"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WorkspaceMode, WorkspaceState } from '@/types/workspacetypes';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/modetoggle';

interface HeaderProps {
    setWorkspaceState: (newState: WorkspaceState) => void;
    workspaceState: WorkspaceState;
    title: string;
}

function Header({
    setWorkspaceState,
    workspaceState,
    title,
}: HeaderProps) {

    return (
        <div className='p-3 border-b flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                <Link href={'/dashboard'}>
                    <Image
                        src={'/logo.svg'}
                        alt='logo'
                        height={40}
                        width={40}
                    />
                </Link>
                <h2 className='text-xl'>{title}</h2>
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
            {/* <Button size={'lg'}>
                Share
                <LinkIcon className='h-4 w-4' />
            </Button> */}
            <ModeToggle />
        </div>
    )
}

export default Header;