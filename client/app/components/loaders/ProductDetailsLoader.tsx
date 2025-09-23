import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsLoader = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 md:mt-8">
      <Skeleton className="w-32 h-10 mb-8 rounded-none bg-orange-100/75 " />
      <div className="flex flex-col md:flex-row gap-5">
        <Skeleton className="h-[25rem] lg:h-[30rem] lg:w-[26rem] w-full md:w-[300px] border rounded-none border-black/30" />
        <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
          <div className="flex-1 flex flex-col space-y-3 divide-slate-300">
            <Skeleton className="h-8 w-3/4 bg-gray-200 rounded-none" />
            <div className="pt-3">
              <Skeleton className="h-4 w-1/3 bg-gray-200 rounded-none" />
            </div>
            <Skeleton className="h-6 w-1/4 bg-gray-200 pt-3 rounded-none" />
            <Skeleton className="h-16 w-full bg-gray-200 pt-3 rounded-none" />
          </div>
          <div className="md:w-[300px] space-y-3 p-4 border border-black/30  max-h-min">
            <Skeleton className="h-6 w-3/4 bg-gray-200 rounded-none" />
            <Skeleton className="h-6 w-1/2 bg-gray-200 rounded-none pt-3" />
            <Skeleton className="h-10 w-full bg-orange-100 rounded-none mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
