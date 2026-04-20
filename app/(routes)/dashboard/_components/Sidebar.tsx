import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import TopSection, { TeamProps } from './TopSection';
import BottomSection from './BottomSection';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';

function Sidebar() {
    const { user } = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TeamProps>();


    const onCreateFile = (fileName: string) => {
        console.log(fileName);
        const promise = createFile({
            fileName: fileName,
            teamId: `${activeTeam?._id}`,
            createdBy: user?.email || '',
            archived: false,
            document: '',
            whiteboard: '',
        });

        toast.promise(promise, {
            success: `File '${fileName}' creaated successfully!`,
            error: "Failed to create file.",
            loading: "Creating a file...",
        });

    }
    return (
        <div className='h-screen sticky w-72 border-r p-6 flex flex-col' >
            <div className='flex-1'>
                <TopSection
                    user={user}
                    setActiveTeamInfo={(activeTeam: TeamProps) => setActiveTeam(activeTeam)}
                />
            </div>
            <div>
                <BottomSection createFile={onCreateFile} />
            </div>
        </div>
    )
}

export default Sidebar;