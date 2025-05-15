"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    FaTachometerAlt,
    FaCar,
    FaTools,
    FaQuestionCircle,
    FaUserFriends,
    FaHome,
    FaInfoCircle,
    FaPhone,
    FaSignOutAlt,
} from "react-icons/fa";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Loader2 } from "lucide-react";
import { UserRole } from "@/types/type";

const publicNavLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/vehicles", label: "Vehicles", icon: <FaCar /> },
    { href: "/services", label: "Services", icon: <FaTools /> },
    { href: "/about", label: "About Us", icon: <FaInfoCircle /> },
    { href: "/contact", label: "Contact Us", icon: <FaPhone /> },
];

const adminNavLinks = [
    { href: "/dashboard", label: "Overview", icon: <FaTachometerAlt /> },
    { href: "/dashboard/vehicles", label: "Vehicles", icon: <FaCar /> },
    { href: "/dashboard/services", label: "Services", icon: <FaTools /> },
    { href: "/dashboard/queries", label: "Queries", icon: <FaQuestionCircle /> },
    { href: "/dashboard/users", label: "Users", icon: <FaUserFriends />, adminOnly: true },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();
    const userRole = session?.user?.role ?? UserRole.PUBLIC;

    const filteredAdminNavLinks = adminNavLinks.filter(
        (link) => !link.adminOnly || userRole === UserRole.ADMIN
    );

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            signOut({ callbackUrl: "/" });
            setOpen(false);
        }


    };

    const SidebarContent = () => (
        <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <Link href="/" className="flex items-center gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-indigo-600"
                    >
                        <path
                            d="M20 10 L30 20 L20 30 L10 20 Z"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="20" cy="20" r="15" stroke="#f97316" strokeWidth="3" fill="none" />
                    </svg>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Vijay Laxmi Auto
                    </h2>
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="xl:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* User Info */}
            {status === "loading" ? (
                <div className="p-3 flex items-center gap-2">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                    <p className="text-sm text-gray-400">Loading...</p>
                </div>
            ) : session ? (
                <div className="p-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-base font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[150px]">
                            {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            {userRole === UserRole.ADMIN ? "Administrator" : "Customer"}
                        </p>
                    </div>
                </div>
            ) : null}

            {/* Navigation */}
            <nav className="p-3 space-y-1">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Dashboard
                </p>
                {filteredAdminNavLinks.map(({ href, label, icon }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-400 hover:scale-105 transition-all duration-200",
                            pathname === href && "bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-400 font-semibold"
                        )}
                    >
                        <span className="text-base">{icon}</span>
                        {label}
                    </Link>
                ))}

                {session && (
                    <>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-2 mb-1">
                            Public
                        </p>
                        {publicNavLinks.map(({ href, label, icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-400 hover:scale-105 transition-all duration-200",
                                    pathname === href && "bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-400 font-semibold"
                                )}
                            >
                                <span className="text-base">{icon}</span>
                                {label}
                            </Link>
                        ))}

                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-2 mb-1">
                            User
                        </p>
                        <Button
                            variant="ghost"
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 rounded-md justify-start transition-all duration-200"
                            onClick={handleSignOut}
                        >
                            <FaSignOutAlt className="text-base" />
                            Sign Out
                        </Button>
                    </>
                )}
            </nav>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile Toggle Button */}
            <div className="xl:hidden fixed top-3 left-3 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700 dark:bg-indigo-800 dark:border-indigo-900 dark:hover:bg-indigo-900"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden xl:block fixed top-0 left-0 bottom-0 z-40">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 xl:ml-64 w-full p-4 sm:p-6">{children}</main>
        </div>
    );
};

export default Layout;
