import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-700">
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-[16/10] rounded-none" />
      
      {/* Content Skeleton */}
      <div className="p-8 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-8 w-3/4" />
        
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
