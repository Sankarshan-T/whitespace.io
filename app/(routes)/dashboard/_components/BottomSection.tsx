import React from 'react'
import { Archive, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

function BottomSection() {
    const menuList = [
        {
            id: 1,
            name: 'Get Sarted',
            path: '',
            icon: Flag,
        },
        {
            id: 2,
            name: 'Archive',
            path: '',
            icon: Archive,
        },
    ];

    return (
        <div>
            {/* adding this for creating a new file? */}
            <Button
                className='w-full py-5 mb-3 cursor-pointer'
            >
                New file
            </Button>

            {menuList.map((menu, index) => (
                <h2 className='flex gap-x-2 p-2 text-sm hover:bg-sidebar-accent-foreground/20 transition rounded-md cursor-pointer' key={index}>
                    <menu.icon />
                    {menu.name}
                </h2>
            ))}
        </div>
    )
}

export default BottomSection;