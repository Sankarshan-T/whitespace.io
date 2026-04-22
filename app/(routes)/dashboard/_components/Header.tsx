import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, SendIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Header() {
    const { user } = useKindeBrowserClient();
    return (
        <div className='flex justify-end w-full gap-x-2 items-center'>
            {/* <div className='flex items-center gap-x-3 border rounded-md p-1 focus-within:ring-2 focus-within:ring-ring transition'>
                <Search className='h-4 w-4' />
                <input type='text' placeholder='Search...' className='outline-none' />
            </div> */}
            {/* <Button className='gap-x-2 text-sm'>
                <SendIcon className='h4 w-4' />
                Invite
            </Button> */}
            {user?.picture && (
                <div>
                    <Image
                        src={user?.picture}
                        alt='User'
                        height={30}
                        width={30}
                        className='rounded-full border-primary border-2'
                        title={`${user.given_name}`}
                    />
                </div>
            )}
        </div>
    )
}

export default Header;