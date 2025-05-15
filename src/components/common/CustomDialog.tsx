'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface CustomDialogProps {
    trigger?: ReactNode;
    title?: string;
    children: ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ trigger, title, children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className="max-w-2xl w-full rounded-2xl p-6 shadow-lg border bg-background overflow-hidden"
            >
                <div className="flex items-center justify-between mb-4">
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                </div>

                <div className="max-h-[75vh] overflow-y-auto pr-1">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
