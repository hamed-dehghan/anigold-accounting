import { SidebarTrigger } from '../../components/ui/sidebar';
import logo from '../../assets/images/logo.png';
import logoBazartala from '../../assets/images/logo-bazartala.png';
import Profile from '../../assets/avatar.svg';
import './header.css';
import Icon from '../../lib/icon';
import Search from '../../components/search';

const Header = () => {
    return (
        <header className="header p-5  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className='flex justify-start gap-8 items-center w-full'>
                <SidebarTrigger />
                <img src={logo} alt="logo" className='w-[45px] h-[45px] flex-shrink-0 cursor-pointer' />
                <img src={logoBazartala} alt="logoBazarTall" className='w-[89px] h-[35px] flex-shrink-0 cursor-pointer hidden md:flex' />
                <Search />
            </div>
            <div className='flex justify-end gap-2 items-center w-full'>
                {/* Hide on mobile, show on md and larger screens */}
                <div className='gap-2 items-center hidden md:flex'>
                    <Icon icon='notification' className='w-[20px] h-[20px] flex-shrink-0 cursor-pointer lg:hidden md:block' />
                    <Icon icon='email' className='w-[30px] h-[30px] flex-shrink-0 cursor-pointer hidden md:block' />
                </div>
                {/* Always show the profile icon */}
                <img src={Profile} alt="profile" className='w-[35px] h-[38px] rounded-[30px] flex-shrink-0  cursor-pointer' />
            </div>
        </header>
    );
};

export default Header;