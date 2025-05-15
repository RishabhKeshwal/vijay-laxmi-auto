'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VehicleDialogProps {
    triggerLabel?: React.ReactNode;
    initialData?: any;
    onSubmit: (data: any) => void;
    children?: React.ReactNode;
}

export const VehicleDialog = ({
    triggerLabel,
    initialData,
    onSubmit,
    children,
}: VehicleDialogProps) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        brand: initialData?.brand || '',
        category: initialData?.category || '',
        mileage: initialData?.mileage || '',
        price: initialData?.price || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || <Button>{triggerLabel || 'Open Dialog'}</Button>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {['name', 'brand', 'category', 'mileage', 'price'].map((field) => (
                        <div key={field}>
                            <Label htmlFor={field} className="capitalize">
                                {field}
                            </Label>
                            <Input
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleSubmit}>
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
