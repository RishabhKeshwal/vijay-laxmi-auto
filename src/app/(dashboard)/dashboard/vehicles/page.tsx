'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CarFront, Plus } from 'lucide-react';
import { VehicleDialog } from '@/components/common/VehicleDialog';
import { DeleteDialog } from '@/components/common/DeleteDialog';
import vehiclesData from '@/constants';
import { Separator } from '@/components/ui/separator';

// Pagination Component
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => (
    <div className="flex justify-center mt-4 gap-2">
        <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
            <Button
                key={i}
                variant={i + 1 === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(i + 1)}
            >
                {i + 1}
            </Button>
        ))}
        <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            Next
        </Button>
    </div>
);

// Define the type for a vehicle
type Vehicle = {
    id: number;
    name: string;
    brand: string;
    category: string;
    mileage: string;
    price: string;
    images: string[];
    slug: string;
    colors: string[];
    technical_specs: any;
    features: string[];
    dimensions: any;
};

const ITEMS_PER_PAGE = 10;

const VehiclesPage: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE);
    const currentVehicles = vehicles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleAdd = (
        newVehicle: Omit<
            Vehicle,
            'id' | 'images' | 'slug' | 'colors' | 'technical_specs' | 'features' | 'dimensions'
        >
    ) => {
        const id = vehicles.length + 1;
        const vehicle: Vehicle = {
            id,
            images: ['https://via.placeholder.com/150'],
            slug: '',
            colors: [],
            technical_specs: {},
            features: [],
            dimensions: {},
            ...newVehicle,
        };
        setVehicles([...vehicles, vehicle]);
    };

    const handleUpdate = (index: number, updatedData: Partial<Vehicle>) => {
        const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
        const updated = [...vehicles];
        updated[actualIndex] = { ...updated[actualIndex], ...updatedData };
        setVehicles(updated);
    };

    const handleDelete = (index: number) => {
        const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
        setVehicles((prev) => prev.filter((_, i) => i !== actualIndex));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <CarFront className="text-indigo-600" size={28} strokeWidth={1.5} />
                            Vehicles
                        </h1>
                        <p className="text-gray-500 text-sm">View and manage all listed vehicles here.</p>
                    </div>

                    {/* <VehicleDialog
                        triggerLabel={
                            <span className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Vehicle
                            </span>
                        }
                        onSubmit={handleAdd}
                    /> */}
                </div>

                <Separator className="my-4" />
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">#</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Mileage</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentVehicles.map((vehicle, index) => (
                            <TableRow key={vehicle.id}>
                                <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={vehicle.images?.[0]}
                                        alt={vehicle.name}
                                        className="h-12 w-16 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{vehicle.name}</TableCell>
                                <TableCell>{vehicle.brand}</TableCell>
                                <TableCell>{vehicle.category}</TableCell>
                                <TableCell>{vehicle.mileage}</TableCell>
                                <TableCell>{vehicle.price}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    {/* <VehicleDialog
                                        triggerLabel=""
                                        initialData={vehicle}
                                        onSubmit={(data) => handleUpdate(index, data)}
                                    >
                                        <Button size="icon" variant="outline">
                                            <FaEdit className="h-4 w-4 text-blue-600" />
                                        </Button>
                                    </VehicleDialog> */}

                                    <DeleteDialog
                                        onConfirm={() => handleDelete(index)}
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
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default VehiclesPage;
