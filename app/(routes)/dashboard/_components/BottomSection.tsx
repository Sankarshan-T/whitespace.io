import { Archive, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useState } from 'react';

function BottomSection({ createFile }: any) {
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

    const [fileName, setFileName] = useState('');

    const onChange = (e: any) => {
        setFileName(e.target.value);
    };

    const onCreateFile = (file: string) => {
        createFile(file);
        setFileName('');
    }

    return (
        <div>
            {/* adding this for creating a new file? */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='w-full py-5 mb-3 cursor-pointer' >
                        New file
                    </Button>
                </DialogTrigger>
                <DialogContent className='animate-in'>
                    <DialogHeader>
                        <DialogTitle>Create a new file</DialogTitle>
                        <DialogDescription>
                            This will be the name of your file. You can always change it again.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder='Enter a file name...'
                        onChange={(e) => onChange(e)}
                    />
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                disabled={!(fileName && fileName.length >= 3)}
                                onClick={() => onCreateFile(fileName)}
                            >
                                Create
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


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