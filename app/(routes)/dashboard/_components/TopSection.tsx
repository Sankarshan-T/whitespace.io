import { FilesListContext } from '@/app/_context/FilesListContex';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { ChevronDown, Edit2, File, LayoutGrid, LogOut, Settings, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { FileProps } from './FilesList';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import Link from 'next/link';

export interface TeamProps {
    createdBy: string;
    teamName: string;
    _id: String;
};

interface TopSectionProps {
    user: any;
    setActiveTeamInfo: (info: any) => void;
}

function TopSection({
    user,
    setActiveTeamInfo,
}: TopSectionProps) {
    const convex = useConvex();
    const router = useRouter();
    const [activeTeam, setActiveTeam] = useState<TeamProps>();
    const [teamList, setTeamList] = useState<TeamProps[]>();
    const { filesList_, setFilesList_ } = useContext(FilesListContext);
    const [filesList, setFilesList] = useState<FileProps[]>();
    const updateTeamName = useMutation(api.teams.updateTeamName);
    const deleteTeam = useMutation(api.teams.deleteTeam);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

    useEffect(() => {
        filesList_ && setFilesList(filesList_);
    }, [filesList_]);

    const onRedirect = (fileId: string) => {
        router.push(`/workspace/${fileId}`);
    };

    const onSettingsClick = () => {
        setNewTeamName(activeTeam?.teamName || "");
        setIsSettingsOpen(true);
    };

    const handleUpdateName = async () => {
        try {
            await updateTeamName({
                teamId: activeTeam?._id as any,
                newName: newTeamName
            });
            toast.success("Team renamed!");
            getTeamList();
        } catch (e) {
            toast.error("Failed to rename team");
        }
    };

    const handleDeleteTeam = async () => {
        const confirm = window.confirm("Are you absolutely sure? This will delete all files in this team.");
        if (!confirm) return;

        try {
            await deleteTeam({ teamId: activeTeam?._id as any });
            toast.success("Team deleted");
            setIsSettingsOpen(false);
            getTeamList();
        } catch (e) {
            toast.error("Error deleting team");
        }
    };

    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users,
        },
        {
            id: 2,
            name: 'Settings',
            path: `/dashboard/settings/${activeTeam?._id}`,
            icon: Settings,
        },
    ];

    useEffect(() => {
        user && getTeamList();
    }, [user]);

    useEffect(() => {
        activeTeam && setActiveTeamInfo(activeTeam);
    }, [activeTeam])

    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });
        console.log("team: ", result)
        setTeamList(result);
        setActiveTeam(result[0]);
    };

    const onMenuClick = (item: any) => {
        if (item.name === 'Settings') {
            onSettingsClick();
        } else if (item.path) {
            router.push(item.path);
        }
    };

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <div className='flex items-center gap-3 hover:bg-sidebar-accent-foreground/20 transition p-2 rounded-md cursor-pointer'>
                        <Image
                            src={"/favicon.png"}
                            alt='logo'
                            height={40}
                            width={40}
                        />
                        <h2 className='text-xl font-medium flex items-center gap-x-2'>
                            {activeTeam?.teamName}
                            <ChevronDown className='h-8 w-8' />
                        </h2>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='ml-6 p-4 transition-all animate-in'>
                    {/* adding teams here */}
                    <div>
                        {teamList?.map((team, index) => (
                            <h2
                                key={index}
                                className={cn(
                                    `p-2 hover:bg-primary/20 transition cursor-pointer rounded-lg `,
                                    activeTeam?._id === team._id && 'bg-primary text-primary-foreground hover:bg-primary/80'
                                )}
                                onClick={() => setActiveTeam(team)}
                            >
                                {team.teamName}
                            </h2>
                        ))}
                    </div>
                    <Separator className='mt-2' />
                    {/* adding settings here*/}
                    <div>
                        {menu.map((item, index) => (
                            <h2 className='flex gap-x-2 items-center p-2 hover:bg-primary/30 rounded-xl transition text-sm cursor-pointer' key={index} onClick={() => onMenuClick(item)}>
                                <item.icon className='h-4 w-4' />
                                {item.name}
                            </h2>
                        ))}
                        <LogoutLink>
                            <h2 className='flex gap-x-2 items-center p-2 hover:bg-primary/30 rounded-xl transition text-sm cursor-pointer'>
                                <LogOut className='h-4 w-4' />
                                Logout
                            </h2>
                        </LogoutLink>
                        <Separator className='mt-2' />
                        {/* user info goes here */}
                        {user && <div className='mt-2 flex gap-2 items-center'>
                            <Image
                                src={user?.picture}
                                alt='user'
                                height={30}
                                width={30} className='rounded-full border-2 border-primary'
                            />
                            <div>
                                <h2 className='font-bold'>{user?.given_name} {user?.family_name}</h2>
                                <h2 className='text-sm text-muted-foreground'>{user?.email}</h2>
                            </div>
                        </div>}
                    </div>
                </PopoverContent>
            </Popover>

            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Team Settings</DialogTitle>
                        <DialogDescription>
                            Manage your team workspace and preferences.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Edit2 className="h-4 w-4" /> Rename Team
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                    placeholder="Team Name"
                                />
                                <Button onClick={handleUpdateName}>Update</Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-red-500 flex items-center gap-2">
                                <Trash2 className="h-4 w-4" /> Danger Zone
                            </label>
                            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                <p className="text-xs text-red-600 dark:text-red-400 mb-3">
                                    Once you delete a team, there is no going back. All files will be permanently removed.
                                </p>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={handleDeleteTeam}
                                >
                                    Delete this team
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* other files stuff... */}
            <div className='w-full flex items-center justify-start gap-x-2 py-1 font-medium mt-8'>
                <LayoutGrid className='h-5 w-5' />
                All files:
            </div>
            <div className='space-y-3 mt-5'>
                {filesList?.map((file: FileProps, index: number) => (
                    <Link href={`/workspace/${file._id}`}>
                        <Button variant={'outline'} className='w-full justify-start gap-x-2 py-5 font-medium bg-muted' key={index}>

                            <File className='h-5 w-5' />
                            {file.fileName}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopSection;