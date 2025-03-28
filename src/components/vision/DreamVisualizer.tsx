import { useState, useEffect } from "react";
import Image from "next/image";

interface DreamVisualizerProps {
  result: {
    imageUrl: string;
    description: string;
  };
}

const DreamVisualizer: React.FC<DreamVisualizerProps> = ({ result }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (result.imageUrl) {
      const img = new window.Image();
      img.src = result.imageUrl;
      img.onload = () => setIsLoading(false);
    }
  }, [result.imageUrl]);

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
              <p className="mt-4 text-gray-600">Loading your vision...</p>
            </div>
          </div>
        )}
        {result.imageUrl && (
          <Image
            src={result.imageUrl}
            alt={result.description}
            fill
            className={`object-cover rounded-lg transition-all duration-500 ${
              isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
        )}
      </div>
      {result.description && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 gradient-text">
            Vision Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{result.description}</p>
        </div>
      )}
    </div>
  );
};

export default DreamVisualizer;
