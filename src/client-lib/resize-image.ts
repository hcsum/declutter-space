import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_ALLOWED_MB = 10;
const MAX_FILE_SIZE_FOR_UPLOAD_MB = 2;

export async function resizeImageFile(file: File): Promise<string | null> {
  if (file.size > MAX_FILE_SIZE_ALLOWED_MB * 1024 * 1024) {
    alert(`Choose image smaller than ${MAX_FILE_SIZE_ALLOWED_MB}MB`);
    return null;
  }
  console.log(
    "Original file size:",
    (file.size / 1024 / 1024).toFixed(2),
    "MB",
  );

  try {
    const options = {
      maxSizeMB: MAX_FILE_SIZE_FOR_UPLOAD_MB,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    console.log(
      "Compressed file size:",
      (compressedFile.size / 1024 / 1024).toFixed(2),
      "MB",
    );
    return await imageCompression.getDataUrlFromFile(compressedFile);
  } catch (error) {
    console.error("Error compressing image:", error);
    return null;
  }
}
