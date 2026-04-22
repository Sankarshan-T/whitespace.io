import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Header() {
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
            <Button size={'lg'}>
                Share
                <Link className='h-4 w-4' />
            </Button>
        </div>
    )
}

export default Header;