'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    const handlePrev = () => {
        if (!isPrevDisabled) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (!isNextDisabled) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-between w-full mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={cn('gap-1', isPrevDisabled && 'cursor-not-allowed opacity-50')}
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>

            <div className="text-sm text-muted-foreground">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={isNextDisabled}
                className={cn('gap-1', isNextDisabled && 'cursor-not-allowed opacity-50')}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
};
