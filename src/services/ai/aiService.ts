export interface AIResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    description: string;
  };
  error?: string;
}

export async function processVisionWithAI(file: File): Promise<AIResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/vision', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error processing vision:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
} 