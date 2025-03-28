import { useState, useCallback, type ChangeEvent } from "react";
import Image from "next/image";
import { processVisionWithAI, type AIResponse } from "@/services/ai/aiService";

interface VisionUploaderProps {
  onUploadStart: () => void;
  onUploadComplete: (data: AIResponse["data"]) => void;
}

interface UploadError {
  message: string;
}

const VisionUploader: React.FC<VisionUploaderProps> = ({
  onUploadStart,
  onUploadComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<UploadError | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError(null);

      if (!file) {
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError({ message: "Please select an image file" });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError({ message: "File size must be less than 5MB" });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleUpload = async () => {
    if (!selectedFile) {
      setError({ message: "Please select a file first" });
      return;
    }

    try {
      setIsProcessing(true);
      onUploadStart();

      const result = await processVisionWithAI(selectedFile);

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to process image");
      }

      onUploadComplete(result.data);
    } catch (err) {
      setError({
        message:
          err instanceof Error
            ? err.message
            : "An error occurred during processing",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center w-full">
        <label
          htmlFor="vision-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors duration-200"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input
            id="vision-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-50 rounded-lg border border-red-100">
          <div className="flex">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error.message}
          </div>
        </div>
      )}

      {preview && (
        <div className="mt-4">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isProcessing}
        className={`btn-primary w-full ${
          !selectedFile || isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Generate Vision"
        )}
      </button>
    </div>
  );
};

export default VisionUploader;
