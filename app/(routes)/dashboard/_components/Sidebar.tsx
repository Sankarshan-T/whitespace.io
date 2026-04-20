import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

function Sidebar() {
    const { user } = useKindeBrowserClient();

    const createFile = (fileName: string) => {

        console.log(fileName);
    }
    return (
        <div className='h-screen sticky w-72 border-r p-6 flex flex-col' >
            <div className='flex-1'>
                <TopSection user={user} />
            </div>
            <div>
                <BottomSection createFile={createFile} />
            </div>
        </div>
    )
}

export default Sidebar;