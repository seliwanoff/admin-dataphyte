// SkeletonScreen.tsx
import React from "react";

const SkeletonScreen: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4 p-6 bg-gray-100 min-h-screen">
      {/* Header Skeleton */}
      <div className="h-10 w-3/4 bg-gray-300 rounded-md"></div>

      {/* Card Skeletons */}
      <div className="flex space-x-4">
        <div className="w-1/3 h-24 bg-gray-300 rounded-md"></div>
        <div className="w-1/3 h-24 bg-gray-300 rounded-md"></div>
        <div className="w-1/3 h-24 bg-gray-300 rounded-md"></div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonScreen;
