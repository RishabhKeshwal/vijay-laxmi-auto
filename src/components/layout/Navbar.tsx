"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types/type";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const publicNavLinks = [
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
    ];

    const authNavLinks = [{ href: "/dashboard", label: "Dashboard" }];
    const userRole = session?.user?.role ?? UserRole.PUBLIC;
    const isAuthenticated = userRole === UserRole.ADMIN || userRole === UserRole.USER;
    const navLinks = isAuthenticated ? [...publicNavLinks, ...authNavLinks] : publicNavLinks;

    const linkVariants = {
        hover: { scale: 1.03, y: -1, transition: { duration: 0.2 } },
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isHovered ? "bg-white shadow-md" : "bg-transparent"
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo + Nav Links */}
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-2">
                            <Card className="p-1 border-none bg-transparent">
                                <svg
                                    width="36"
                                    height="36"
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
                            </Card>
                            <span className="text-2xl font-bold text-gray-900">Vijay Laxmi Auto</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map(({ href, label }) => (
                                <motion.div key={href} variants={linkVariants} whileHover="hover">
                                    <Link
                                        href={href}
                                        className={`text-sm uppercase font-medium tracking-wide border-b-2 border-transparent hover:border-indigo-600 transition-all duration-200 ${pathname === href ? "text-indigo-600 border-indigo-600" : "text-gray-700"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>


                    <div className="hidden md:flex items-center gap-4">
                        {status === "loading" ? (
                            <Button variant="ghost" disabled className="text-gray-400">
                                Loading...
                            </Button>
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-3 text-gray-900 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-full px-5 py-2.5 transition-all duration-300"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                            {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <span className="text-sm font-medium truncate max-w-[120px]">
                                            {session.user?.name || "User"}
                                        </span>
                                        <svg
                                            className="h-5 w-5 text-indigo-600"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </Button>
                                </DropdownMenuTrigger>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: -10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <DropdownMenuContent className="w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4">
                                        {/* User Info Section */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-semibold">
                                                {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">
                                                    {session.user?.name || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {session.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                <strong>Role:</strong>{" "}
                                                {userRole === UserRole.ADMIN ? "Administrator" : "Customer"}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                <strong>Member Since:</strong>{" "}
                                                {new Date(session.user?.createdAt || Date.now()).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700 my-2" />

                                        {/* Actions Section */}
                                        <motion.div
                                            variants={{ hover: { backgroundColor: "#f1f5f9", transition: { duration: 0.2 } } }}
                                            whileHover="hover"
                                        >
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/orders"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg flex items-center gap-2"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>
                                                    My Orders
                                                </Link>
                                            </DropdownMenuItem>
                                        </motion.div>
                                        <motion.div
                                            variants={{ hover: { backgroundColor: "#f1f5f9", transition: { duration: 0.2 } } }}
                                            whileHover="hover"
                                        >
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/support"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg flex items-center gap-2"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                                        />
                                                    </svg>
                                                    Support
                                                </Link>
                                            </DropdownMenuItem>
                                        </motion.div>
                                        {userRole === UserRole.ADMIN && (
                                            <motion.div
                                                variants={{ hover: { backgroundColor: "#f1f5f9", transition: { duration: 0.2 } } }}
                                                whileHover="hover"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href="/admin/manage"
                                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg flex items-center gap-2"
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                        Admin Panel
                                                    </Link>
                                                </DropdownMenuItem>
                                            </motion.div>
                                        )}
                                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700 my-2" />
                                        <motion.div
                                            variants={{ hover: { backgroundColor: "#f1f5f9", transition: { duration: 0.2 } } }}
                                            whileHover="hover"
                                        >
                                            <DropdownMenuItem asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 px-3 py-2 rounded-lg flex items-center gap-2 justify-start"
                                                    onClick={() => signOut({ callbackUrl: "/" })}
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    Sign Out
                                                </Button>
                                            </DropdownMenuItem>
                                        </motion.div>
                                    </DropdownMenuContent>
                                </motion.div>
                            </DropdownMenu>
                        ) : (
                            <Button
                                asChild
                                className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full px-6 py-2 text-sm font-semibold"
                            >
                                <Link href="/signin">Sign In</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu (Right Side Sheet) */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="text-gray-900 hover:text-indigo-600 p-2">
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[260px] sm:w-[300px] bg-white dark:bg-gray-900">
                                <SheetHeader className="mb-4 border-b pb-3 px-4">
                                    <SheetTitle>
                                        <Link href="/" className="flex items-center gap-2">
                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 40 40"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-orange-500"
                                            >
                                                <path
                                                    d="M20 10 L30 20 L20 30 L10 20 Z"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <circle cx="20" cy="20" r="15" stroke="#4f46e5" strokeWidth="3" fill="none" />
                                            </svg>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                Vijay Laxmi Auto
                                            </span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-3 px-4">
                                    {navLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`block text-sm font-medium uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 pb-2 transition-colors duration-200 ${pathname === href
                                                ? "text-indigo-600 dark:text-indigo-400"
                                                : "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    ))}

                                    {/* Auth Section */}
                                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                                        {status === "loading" ? null : session ? (
                                            <>
                                                <Link
                                                    href="/profile"
                                                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2"
                                                >
                                                    Profile
                                                </Link>
                                                {userRole === UserRole.ADMIN && (
                                                    <Link
                                                        href="/admin/manage"
                                                        className="block text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2"
                                                    >
                                                        Admin Panel
                                                    </Link>
                                                )}
                                                <Button
                                                    onClick={() => signOut({ callbackUrl: "/" })}
                                                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    Sign Out
                                                </Button>
                                            </>
                                        ) : (
                                            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2">
                                                <Link href="/signin">Sign In</Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
