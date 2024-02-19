export const Skeleton = (itemCount) => {
  if (itemCount) {
    const item = [];
    for (let index = 0; index < itemCount; index++) {
      item.push(NFTCardSkeletonLoader(index));
    }
    return item;
  } else {
    return NFTCardSkeletonLoader();
  }
};

const NFTCardSkeletonLoader = (index = 0) => {
  return (
    <div className="animate-pulse rounded-md" key={'loader' + (index + 1)}>
      <div className={`w-full min-h-60 aspect-w-1 aspect-h-1 overflow-hidden bg-gray-400 rounded-md`} />
      <div className="flex-1 p-4 flex flex-col gap-3 bg-slate-50">
        <span className="bg-gray-400 h-3 w-1/2 rounded-sm"></span>
        <span className="bg-gray-400 h-3 w-1/3 rounded-sm"></span>
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2 flex flex-col">
            <div className="bg-gray-400 h-2 w-1/2 rounded-sm" />
          </div>
          <div className="bg-gray-300 h-2 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};
