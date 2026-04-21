import { FilesListContext } from '@/app/_context/FilesListContex';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export interface FileProps {
    archive: boolean;
    createdBy: string;
    document: string;
    whiteboard: string;
    fileName: string;
    teamId: string;
    _id: string;
    _creationTime: number;
}

function FilesList() {
    const { filesList_, setFilesList_ } = useContext(FilesListContext);
    const [filesList, setFilesList] = useState<FileProps[]>();
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        filesList_ && setFilesList(filesList_);
    }, [filesList_]);

    return (
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                    <tr className="*:font-bold *:text-primary">
                        <th className="px-3 py-2 whitespace-nowrap">File Name</th>
                        <th className="px-3 py-2 whitespace-nowrap">Created At</th>
                        <th className="px-3 py-2 whitespace-nowrap">Last Edited</th>
                        <th className="px-3 py-2 whitespace-nowrap">Author</th>
                        <th className="px-3 py-2 whitespace-nowrap">Options</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {filesList?.map((file: FileProps, index: number) => (
                        <tr className="*:text-foreground *:first:font-medium" key={index}>
                            <td className="px-3 py-2 whitespace-nowrap">{file.fileName} </td>
                            <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MMM YYYY')} </td>
                            <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MMM YYYY')} </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {user?.picture &&
                                    <Image
                                        src={user?.picture}
                                        alt='User'
                                        height={30}
                                        width={30}
                                        className='rounded-full border-primary border-2'
                                        title={`${user.given_name}`}
                                    />
                                }
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='animate-in'>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>More</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Archive className='h-4 w-4' />
                                                Archive
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FilesList;