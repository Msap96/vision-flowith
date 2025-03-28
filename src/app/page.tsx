"use client";

import { useState } from "react";
import VisionUploader from "@/components/vision/VisionUploader";
import DreamVisualizer from "@/components/vision/DreamVisualizer";
import Header from "@/components/common/Header";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { type AIResponse } from "@/services/ai/aiService";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIResponse["data"] | null>(null);

  const handleUploadComplete = (data: AIResponse["data"]) => {
    setIsProcessing(false);
    setResult(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Transform Your Ideas Into Reality
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your photos and let our AI transform them into stunning
                visuals. Whether it's your dream vacation, home, education, or
                fitness journey - we'll help you visualize it.
              </p>
            </div>

            <ErrorBoundary>
              <div className="card mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 gradient-text">
                      Create Your Vision
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Upload a photo or image that represents your vision, and
                      our AI will help you transform it.
                    </p>
                    <VisionUploader
                      onUploadStart={() => setIsProcessing(true)}
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600" />
                        <p className="mt-4 text-gray-600">
                          Transforming your vision...
                        </p>
                      </div>
                    ) : result ? (
                      <DreamVisualizer result={result} />
                    ) : (
                      <div className="text-center p-8 bg-gray-50 rounded-lg w-full">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-600">
                          Your transformed vision will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {result && !isProcessing && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-xl font-semibold mb-4">
                      Your Vision Details
                    </h3>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                )}
              </div>
            </ErrorBoundary>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Dream Vacation",
                  image:
                    "https://r2.flowith.net/files/3874db62-c686-444a-b3ed-13e34eae67aa/1743178586117-Realis.jpeg",
                  description: "Visualize your perfect getaway",
                },
                {
                  title: "Dream Home",
                  image:
                    "https://r2.flowith.net/files/3874db62-c686-444a-b3ed-13e34eae67aa/1743178586751-Realis.jpeg",
                  description: "Design your ideal living space",
                },
                {
                  title: "Education",
                  image:
                    "https://r2.flowith.net/files/3874db62-c686-444a-b3ed-13e34eae67aa/1743178615017-Realis.jpeg",
                  description: "Plan your learning journey",
                },
                {
                  title: "Fitness Journey",
                  image:
                    "https://r2.flowith.net/files/3874db62-c686-444a-b3ed-13e34eae67aa/1743178672242-Realis.jpeg",
                  description: "Envision your fitness goals",
                },
              ].map((item, index) => (
                <div key={index} className="card group cursor-pointer h-full">
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
