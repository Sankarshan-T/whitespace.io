import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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
            path: '',
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
        if (item.path) {
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

            {/* other stuff */}
            <Button variant={'outline'} className='w-full justify-start gap-x-2 py-5 font-medium mt-8 bg-muted'>
                <LayoutGrid className='h-5 w-5' />
                All files
            </Button>
        </div>
    )
}

export default TopSection;