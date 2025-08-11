import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="mb-5 w-full h-4" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export const FormSkeleton = () => {
  return (
    <div className="flex flex-col space-x-3 space-y-8">
      <div className="space-y-3">
        <Skeleton className="w-[150px] h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-[150px] h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
      </div>
      <Skeleton className="w-full h-[30px]" />
    </div>
  );
};
