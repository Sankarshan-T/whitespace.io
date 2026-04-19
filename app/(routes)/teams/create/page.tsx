"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { toast } from 'sonner';

function CreateTeam() {
    const [teamName, setTeamName] = useState("");
    const createTeam = useMutation(api.teams.createTeam);
    const { user } = useKindeBrowserClient();
    const router = useRouter();

    const onCreateTeam = () => {
        const promise = createTeam({
            teamName: teamName,
            createdBy: user?.email || "",
        })
            .then(() => router.push("/dashboard"));

        toast.promise(promise, {
            success: `Team ${teamName} created successfully!`,
            error: "Failed to create a team.",
            loading: "Creating a team..."
        })

    }

    return (
        <div className='px-6 md:px-16 my-16'>
            <Image
                src={'/logo-long.svg'}
                alt='logo'
                height={250}
                width={250}
            />
            <div className='flex flex-col items-center mt-8'>
                <h2 className='font-bold text-[40px] text-primary py-3'>What should we call your team?</h2>
                <h2 className='text-muted-foreground'>
                    Don't worry! You can always change this later from the settings
                </h2>
                <div className='mt-7 w-[40%]'>
                    <label className='text-muted-foreground'>Team name</label>
                    <Input
                        placeholder='Team name...'
                        className='mt-1'
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <Button
                    className='mt-9 w-[40%] py-5 text-md'
                    disabled={!(teamName && teamName.length > 0)}
                    onClick={onCreateTeam}
                >
                    Create Team
                </Button>
            </div>
        </div>
    )
}

export default CreateTeam