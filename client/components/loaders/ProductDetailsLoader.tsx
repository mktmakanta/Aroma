import { Skeleton } from "../ui/skeleton";

const ProductDetailsLoader = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 md:mt-8">
      <Skeleton className="w-32 h-10 bg-orange-100/75" />
      <div className="flex flex-col md:flex-row gap-5">
        <Skeleton className="h-[25rem] lg:h-[30rem] lg:w-[26rem] w-full md:w-[300px] rounded-lg shadow-lg" />
        <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
          <div className="flex-1 flex flex-col space-y-3 divide-y divide-slate-300">
            <Skeleton className="h-8 w-3/4 bg-gray-200" />
            <div className="pt-3">
              <Skeleton className="h-4 w-1/3 bg-gray-200" />
            </div>
            <Skeleton className="h-6 w-1/4 bg-gray-200 pt-3" />
            <Skeleton className="h-16 w-full bg-gray-200 pt-3" />
          </div>
          <div className="md:w-[300px] space-y-3 p-4 ring-1 ring-orange-100 shadow-sm rounded-md divide-y divide-orange-100 max-h-min">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-6 w-1/2 bg-gray-200 pt-3" />
            <Skeleton className="h-10 w-full bg-orange-100 mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
