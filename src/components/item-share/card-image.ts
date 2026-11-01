export type ShareCardItem = {
  name: string;
  pieces: number;
  image: string | null;
  story: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image-load"));
    image.src = src;
  });
}

// Descriptions change often; the source photograph should only load once.
const cardPhotos = new Map<string, Promise<HTMLImageElement>>();

function loadCardPhoto(src: string) {
  const cached = cardPhotos.get(src);
  if (cached) return cached;
  const loading = loadImage(src).catch((error) => {
    cardPhotos.delete(src);
    throw error;
  });
  if (cardPhotos.size >= 6) cardPhotos.delete(cardPhotos.keys().next().value!);
  cardPhotos.set(src, loading);
  return loading;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    // Word boundaries for Latin text, character boundaries for CJK and long words.
    const words = paragraph.match(/\S+\s*|\s+/g) || [""];
    for (const word of words) {
      if (context.measureText(line + word).width <= maxWidth) {
        line += word;
        continue;
      }
      if (line.trim()) lines.push(line.trimEnd());
      line = "";
      for (const character of Array.from(word)) {
        if (line && context.measureText(line + character).width > maxWidth) {
          lines.push(line.trimEnd());
          line = "";
        }
        line += character;
      }
    }
    lines.push(line.trimEnd());
  }
  return lines;
}

// One renderer powers both the preview and the downloaded file.
export async function renderShareCard(
  item: ShareCardItem,
  labels: { eyebrow: string; pieces: string; noPhoto: string },
) {
  await document.fonts.ready;
  const font = getComputedStyle(document.body).fontFamily;
  const photo = item.image ? await loadCardPhoto(item.image) : null;
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas-unavailable");
  context.font = `500 98px ${font}`;
  const titleLines = wrapText(context, item.name, 1512);
  context.font = `400 48px ${font}`;
  const storyLines = item.story ? wrapText(context, item.story, 1420) : [];
  const titleY = 1770;
  const storyY = titleY + titleLines.length * 126 + 80;
  const footerY =
    storyY + storyLines.length * 78 + (storyLines.length ? 130 : 40);
  canvas.height = footerY + 160;

  context.fillStyle = "#fbf9f8";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#82533f";
  context.font = `600 35px ${font}`;
  context.fillText(labels.eyebrow, 144, 150);
  context.fillStyle = "#efeded";
  context.fillRect(144, 240, 1512, 1380);
  if (photo) {
    const scale = Math.min(
      1512 / photo.naturalWidth,
      1380 / photo.naturalHeight,
    );
    const width = photo.naturalWidth * scale;
    const height = photo.naturalHeight * scale;
    context.drawImage(
      photo,
      144 + (1512 - width) / 2,
      240 + (1380 - height) / 2,
      width,
      height,
    );
  } else {
    context.fillStyle = "#84746e";
    context.font = `400 44px ${font}`;
    context.textAlign = "center";
    context.fillText(labels.noPhoto, 900, 930);
    context.textAlign = "left";
  }
  context.fillStyle = "#1b1c1c";
  context.font = `500 98px ${font}`;
  titleLines.forEach((line, index) =>
    context.fillText(line, 144, titleY + index * 126),
  );
  context.font = `400 48px ${font}`;
  context.fillStyle = "#51443f";
  storyLines.forEach((line, index) =>
    context.fillText(line, 144, storyY + index * 78),
  );
  context.strokeStyle = "#d6c2bb";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(144, footerY - 55);
  context.lineTo(1656, footerY - 55);
  context.stroke();
  context.font = `400 32px ${font}`;
  context.fillStyle = "#84746e";
  context.fillText(
    labels.pieces.replace("{count}", String(item.pieces)),
    144,
    footerY + 15,
  );
  context.textAlign = "right";
  context.fillText("declutteryourhome.net", 1656, footerY + 15);
  return canvas.toDataURL("image/png");
}

export async function prepareSharePhoto(file: File): Promise<string> {
  if (
    !/^image\/(jpeg|png|webp)$/.test(file.type) ||
    file.size > 15 * 1024 * 1024
  ) {
    throw new Error("invalid-photo");
  }
  const objectUrl = URL.createObjectURL(file);
  try {
    const photo = await loadImage(objectUrl);
    const scale = Math.min(
      1,
      1800 / Math.max(photo.naturalWidth, photo.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(photo.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(photo.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas-unavailable");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(photo, 0, 0, canvas.width, canvas.height);
    let result = canvas.toDataURL("image/jpeg", 0.86);
    // Stay below the app's 2 MB server-action limit, including base64 overhead.
    while (result.length > 1_800_000 && canvas.width > 600) {
      canvas.width = Math.round(canvas.width * 0.8);
      canvas.height = Math.round(canvas.height * 0.8);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(photo, 0, 0, canvas.width, canvas.height);
      result = canvas.toDataURL("image/jpeg", 0.8);
    }
    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function downloadShareCard(dataUrl: string, name: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${
    name
      .replace(/[^\p{L}\p{N} -]/gu, "")
      .trim()
      .slice(0, 80) || "second-look"
  }.png`;
  link.click();
}
