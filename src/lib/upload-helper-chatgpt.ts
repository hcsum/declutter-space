"use server";

import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
import { MAX_FILE_SIZE_FOR_UPLOAD_MB } from "./definitions";

const worker_secret = process.env.WORKER_SECRET!;

export type DetectedItemChatGPT = {
  label: string;
  count: number;
};

export async function uploadImageToWorker(imageData: string) {
  try {
    const approxSizeInBytes = imageData.length * 0.75;
    if (approxSizeInBytes > MAX_FILE_SIZE_FOR_UPLOAD_MB * 1024 * 1024) {
      throw new Error(
        `Image size is ${approxSizeInBytes / 1024 / 1024}MB, exceeds ${MAX_FILE_SIZE_FOR_UPLOAD_MB}MB limit`,
      );
    }

    console.log("imageData size", approxSizeInBytes / 1024 / 1024, "MB");

    const response = await fetch(process.env.WORKER_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secret: worker_secret,
      },
      body: JSON.stringify({
        image: imageData,
        model: "gpt-4o",
      }),
      agent:
        process.env.NODE_ENV === "development"
          ? new HttpsProxyAgent("http://127.0.0.1:7890")
          : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`,
      );
    }

    const { data } = await response.json();

    return JSON.parse(data) as DetectedItemChatGPT[];
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
