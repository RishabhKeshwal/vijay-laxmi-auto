'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CalendarClock, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { IService } from '@/types/type';
import CustomDialog from '@/components/common/CustomDialog';
import AddService from '@/components/Services/AddService';
import UpdateService from '@/components/Services/UpdateService';
import { DeleteDialog } from '@/components/common/DeleteDialog';
import { toast } from 'sonner'; // ✅ Sonner toast

const ServicesPage = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [selectedService, setSelectedService] = useState<IService | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services/get-services');
                if (!res.ok) throw new Error('Failed to fetch services');
                const data = await res.json();
                setServices(data.services || []);
            } catch (err) {
                const message = (err as Error).message;
                setError(message);

                toast.error('Failed to load services', {
                    description: message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [refreshKey]);

    const getStatusStyle = (status: IService['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'confirmed':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/services/delete-service?id=${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to delete service');
            }

            toast.success('Service deleted successfully');
            setRefreshKey(prev => prev + 1);
        } catch (err) {
            toast.error('Error deleting service', {
                description: (err as Error).message,
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <CalendarClock className="text-blue-600" size={28} strokeWidth={1.5} />
                        Scheduled Services
                    </h1>
                    <p className="text-gray-500 text-sm">Manage and view all upcoming services here.</p>
                </div>

                <CustomDialog
                    title="Schedule New Service"
                    trigger={
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Service
                        </Button>
                    }
                >
                    <AddService
                        onSuccess={() => {
                            setRefreshKey((prev) => prev + 1);
                            toast.success("Service added successfully");
                        }}
                    />
                </CustomDialog>
            </div>

            <Separator className="my-4" />

            <div className="rounded-md border bg-white shadow-sm">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">Loading services...</div>
                ) : error ? (
                    <div className="p-6 text-center text-red-500">Error: {error}</div>
                ) : services.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No scheduled services found.</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service, index) => (
                                <TableRow key={service.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{`${service.company} ${service.vehicleModel ?? ''}`}</TableCell>
                                    <TableCell>{new Date(service.preferredDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{service.preferredTime}</TableCell>
                                    <TableCell>{service.serviceType}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(service.status)}`}
                                        >
                                            {service.status ?? 'N/A'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <CustomDialog
                                            title="Update Service"
                                            trigger={
                                                <Button size="icon" variant="outline" onClick={() => setSelectedService(service)}>
                                                    <FaEdit className="h-4 w-4 text-blue-600" />
                                                </Button>
                                            }
                                        >
                                            {selectedService && (
                                                <UpdateService
                                                    service={selectedService}
                                                    onSuccess={() => {
                                                        setRefreshKey(prev => prev + 1);
                                                        toast.success("Service updated successfully");
                                                    }}
                                                />
                                            )}
                                        </CustomDialog>

                                        <DeleteDialog
                                            onConfirm={() => handleDelete(service.id)}
                                            trigger={
                                                <Button size="icon" variant="destructive">
                                                    <FaTrash className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
