import React, { type FC } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`animate-pulse rounded-sm bg-gray-300 ${className}`} />;
};

export function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/3">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="h-[450px] w-[300px] rounded-lg" />
        </div>
        <div className="mt-4 md:mt-0 md:w-2/3">
          <Skeleton className="mb-2 h-8 w-3/4" />
          <Skeleton className="mb-4 h-6 w-1/2" />
          <Skeleton className="mb-4 h-6 w-1/4" />
          <Skeleton className="mb-4 h-24 w-full" />
          <Skeleton className="mb-6 h-12 w-3/4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const MovieCardSkeleton: FC = () => {
  return (
    <div className="relative max-h-80 min-h-44 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
      <Skeleton className="h-full w-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4">
        <Skeleton className="mb-1 h-6 w-3/4" />
        <Skeleton className="mb-1 h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const MovieListSkeleton: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, index) => (
          <li key={index}>
            <MovieCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};
