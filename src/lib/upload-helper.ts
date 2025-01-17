import fs from "fs";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

const worker_api_key = process.env.WORKER_API_KEY!;

export type DetectedItem = {
  score: number;
  label: string;
  // box: any; // You can type this more specifically if needed
};

export async function uploadImageToWorker(filePath: string) {
  try {
    // Read the image file from disk
    const fileBuffer = fs.readFileSync(filePath);

    // Convert the file buffer to an ArrayBuffer
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength,
    );

    // Convert the ArrayBuffer to a Uint8Array
    const pixelArray = [...new Uint8Array(arrayBuffer)];

    console.log("Prepared pixel array:", pixelArray.slice(0, 100)); // Log the first 100 values for debugging

    // Send the POST request to the worker with the proxy agent
    const response = await fetch(process.env.WORKER_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": worker_api_key, // Include the API key
      },
      body: JSON.stringify({
        image: pixelArray,
      }),
      agent:
        process.env.NODE_ENV === "development"
          ? new HttpsProxyAgent("http://127.0.0.1:7890")
          : undefined, // Use the proxy
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`,
      );
    }

    const result = (await response.json()) as { response: DetectedItem[] };
    return result.response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
