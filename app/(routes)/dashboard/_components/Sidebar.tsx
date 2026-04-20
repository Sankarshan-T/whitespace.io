import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

function Sidebar() {
    const { user } = useKindeBrowserClient();
    return (
        <div className='h-screen sticky w-72 border-r p-6 flex flex-col' >
            <div className='flex-1'>
                <TopSection user={user} />
            </div>
            <div>
                <BottomSection />
            </div>
        </div>
    )
}

export default Sidebar;