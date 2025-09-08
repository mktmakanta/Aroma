import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const ProductsLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="w-full max-w-xs mx-auto">
          <CardHeader>
            <Skeleton className="w-full h-56 rounded-md" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </CardContent>
          <CardFooter className="flex flex-col items-start mt-4">
            <Skeleton className="w-1/3 h-4 mb-2" />
            <Skeleton className="w-1/4 h-6" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsLoader;
