import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MessageCardSkeleton() {
  return (
    <Card className="card-bg border-violet-500/10 shadow-lg relative overflow-hidden">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4 bg-violet-500/10" />
          <Skeleton className="h-8 w-8 rounded-full bg-violet-500/10" />
        </div>
        <Skeleton className="h-3 w-1/3 bg-violet-500/5" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full bg-violet-500/10" />
          <Skeleton className="h-5 w-20 rounded-full bg-violet-500/10" />
          <Skeleton className="h-5 w-16 rounded-full bg-violet-500/10" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MessageCardSkeleton key={i} />
      ))}
    </div>
  );
}
