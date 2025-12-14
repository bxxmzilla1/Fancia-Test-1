
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import InstallButton from './InstallButton';
import { HomeIcon, InboxIcon, Cog6ToothIcon, BellIcon, PlusCircleIcon } from './icons/Icons';

interface HeaderProps {
    totalUnreadCount: number;
}

const Header: React.FC<HeaderProps> = ({ totalUnreadCount }) => {
    const navLinkClasses = "flex flex-col items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors";
    const activeLinkClasses = "text-primary-500 bg-primary-500/10";
    const inactiveLinkClasses = "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800";
    
    const logoSrc = "https://github.com/bxxmzilla1/IGprofile/blob/main/fanciaga.png?raw=true";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50 h-20 flex items-center">
                <nav className="max-w-7xl mx-auto flex justify-between items-center w-full px-2 sm:px-4 lg:px-6">
                    <Link to="/home">
                        <img src={logoSrc} alt="Fanciaga" className="h-8 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink to="/home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                            Home
                        </NavLink>
                        <NavLink to="/notifications" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                            Notifications
                        </NavLink>
                        <NavLink to="/upload" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                            Upload
                        </NavLink>
                        <NavLink to="/inbox" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                            Inbox
                        </NavLink>
                        <NavLink to="/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                            Settings
                        </NavLink>
                        <InstallButton />
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {/* Mobile Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 z-50">
                <div className="flex justify-around items-center h-16 px-2">
                    <NavLink to="/home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                        <HomeIcon className="w-7 h-7"/>
                    </NavLink>
                    <NavLink to="/notifications" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                        <BellIcon className="w-7 h-7"/>
                    </NavLink>
                    <NavLink to="/upload" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                        <PlusCircleIcon className="w-7 h-7"/>
                    </NavLink>
                    <NavLink to="/inbox" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                        <div className="relative">
                            <InboxIcon className="w-7 h-7"/>
                            {totalUnreadCount > 0 && (
                                <span className="absolute -top-1 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-1 text-xs font-bold text-white">
                                    {totalUnreadCount}
                                </span>
                            )}
                        </div>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                        <Cog6ToothIcon className="w-7 h-7"/>
                    </NavLink>
                    <div className="flex items-center">
                        <InstallButton variant="icon" />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
