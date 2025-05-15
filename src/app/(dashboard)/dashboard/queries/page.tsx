'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MessageCircleMore, Plus } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { DeleteDialog } from '@/components/common/DeleteDialog';
import { useSession } from 'next-auth/react';

interface Query {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    status: string;
}

const QueriesPage = () => {
    const [queries, setQueries] = useState<Query[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const fetchQueries = async () => {
        try {
            const res = await fetch('/api/contact/get-querie');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setQueries(data.queries);
        } catch (err: any) {
            toast.error(err.message || 'Failed to load queries');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/contact/delete-querie?id=${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to delete');

            toast.success('Query deleted successfully');
            setQueries(prev => prev.filter(q => q._id !== id));
        } catch (err: any) {
            toast.error(err.message || 'Error deleting query');
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const isAdmin = session?.user?.role === 'admin';

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageCircleMore className="text-indigo-600" size={28} strokeWidth={1.5} />
                        Customer Queries
                    </h1>
                    <p className="text-gray-500 text-sm">
                        View and respond to customer queries here.
                    </p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    New Query
                </Button>
            </div>

            <Separator className="my-4" />

            <Card className="shadow-sm">
                <CardContent className="p-0 overflow-x-auto">
                    {loading ? (
                        <div className="p-6 text-gray-500">Loading queries...</div>
                    ) : queries.length === 0 ? (
                        <div className="p-6 text-gray-500">No queries available yet.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {queries.map((query, index) => {
                                    const formattedDate = new Date(query.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });

                                    return (
                                        <TableRow key={query._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{query.name}</TableCell>
                                            <TableCell>{query.email}</TableCell>
                                            <TableCell>{query.message}</TableCell>
                                            <TableCell>{formattedDate}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full ${query.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                        }`}
                                                >
                                                    {query.status}
                                                </span>
                                            </TableCell>
                                            {isAdmin && (
                                                <TableCell className="text-right space-x-2">
                                                    <DeleteDialog
                                                        onConfirm={() => handleDelete(query._id)}
                                                        trigger={
                                                            <Button size="icon" variant="destructive">
                                                                <FaTrash className="h-4 w-4" />
                                                            </Button>
                                                        }
                                                    />
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default QueriesPage;
