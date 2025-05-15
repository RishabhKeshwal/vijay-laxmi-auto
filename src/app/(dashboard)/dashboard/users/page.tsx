'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { UserRound, Plus } from 'lucide-react';
import { FaTrash, FaUserEdit, FaPlus } from 'react-icons/fa';

const users = [
    {
        id: 1,
        name: 'Rohit Mehta',
        email: 'rohit@example.com',
        role: 'Admin',
        joined: '2023-08-15',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Sneha Kapoor',
        email: 'sneha@example.com',
        role: 'User',
        joined: '2024-01-10',
        status: 'Inactive',
    },
];

const UserPage = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <UserRound className="text-green-600" size={28} strokeWidth={1.5} />
                        Users
                    </h1>
                    <p className="text-gray-500 text-sm">Manage all registered users here.</p>
                </div>

                {/* Button */}
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    New User
                </Button>
            </div>

            <Separator className="my-4" />

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    {users.length === 0 ? (
                        <div className="p-6 text-gray-500">No users found.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.joined}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`text-xs font-medium px-2 py-1 rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="outline">
                                                <FaUserEdit className="h-4 w-4 text-blue-600" />
                                            </Button>
                                            <Button size="icon" variant="destructive">
                                                <FaTrash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserPage;
