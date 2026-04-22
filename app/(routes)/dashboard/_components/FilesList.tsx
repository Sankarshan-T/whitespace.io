import { FilesListContext } from '@/app/_context/FilesListContex';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { MoreHorizontal, Trash, Edit } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

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
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<FileProps | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const deleteFile = useMutation(api.files.deleteFile);
    const renameFile = useMutation(api.files.renameFile);

    useEffect(() => {
        filesList_ && setFilesList(filesList_);
    }, [filesList_]);

    useEffect(() => {
        filesList_ && setFilesList(filesList_);
    }, [filesList_]);

    const onRedirect = (fileId: string) => {
        router.push(`/workspace/${fileId}`);
    };

    const onDeleteFile = async () => {
        if (!selectedFile) return;
        try {
            await deleteFile({ _id: selectedFile._id as any });
            toast.success("File deleted successfully");
        } catch (e) {
            toast.error("Failed to delete file");
        }
    };

    const onRenameFile = async () => {
        if (!selectedFile || !newName) return;
        try {
            await renameFile({ _id: selectedFile._id as any, newName });
            toast.success("File renamed");
            setIsRenameOpen(false);
        } catch (e) {
            toast.error("Failed to rename file");
        }
    };

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
                        <tr
                            className="*:text-foreground *:first:font-medium cursor-pointer"
                            key={index}
                            onClick={() => onRedirect(file._id)}
                        >
                            <td className="px-3 py-2 whitespace-nowrap">{file.fileName} </td>
                            <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MMM YYYY')} </td>
                            <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MMM YYYY')} </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {user?.picture && (
                                    <div className='flex gap-x-2 items-center'>
                                        <Image
                                            src={user?.picture}
                                            alt='User'
                                            height={30}
                                            width={30}
                                            className='rounded-full border-primary border-2'
                                            title={`${user.given_name}`}
                                        />
                                        <div>{user.given_name}</div>
                                    </div>
                                )
                                }
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost"><MoreHorizontal /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenuItem onClick={() => {
                                            setSelectedFile(file);
                                            setNewName(file.fileName);
                                            setIsRenameOpen(true);
                                        }}>
                                            <Edit className='h-4 w-4 mr-2' /> Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() => {
                                                setSelectedFile(file);
                                                setIsDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash className='h-4 w-4 mr-2' /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete <strong>{selectedFile?.fileName}</strong>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDeleteFile} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename File</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="New file name"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
                        <Button onClick={onRenameFile}>Save</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FilesList;