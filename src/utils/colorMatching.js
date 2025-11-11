import { EDGE_SECTOR_COUNT } from '../helpers/constants';

export const DEFAULT_COLOR_TOLERANCE = 18;

const EDGE_SAMPLE_SIZE = 2;

const clamp = value => Math.min(255, Math.max(0, value));

const rgbToXyz = (r, g, b) => {
  // Convert sRGB [0,255] to XYZ
  const pivot = c => {
    const normalized = c / 255;
    return normalized > 0.04045
      ? Math.pow((normalized + 0.055) / 1.055, 2.4)
      : normalized / 12.92;
  };

  const R = pivot(r);
  const G = pivot(g);
  const B = pivot(b);

  const X = R * 0.4124 + G * 0.3576 + B * 0.1805;
  const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const Z = R * 0.0193 + G * 0.1192 + B * 0.9505;

  return [X * 100, Y * 100, Z * 100];
};

const xyzToLab = (x, y, z) => {
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  const pivot = value => {
    const v = value > 0.008856 ? Math.cbrt(value) : (7.787 * value) + 16 / 116;
    return v;
  };

  const fx = pivot(x / refX);
  const fy = pivot(y / refY);
  const fz = pivot(z / refZ);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return [L, a, b];
};

const rgbToLab = (r, g, b) => {
  const [x, y, z] = rgbToXyz(r, g, b);
  return xyzToLab(x, y, z);
};

const createEmptySegments = count =>
  Array.from({ length: count }, (_, index) => ({
    index,
    rgb: [0, 0, 0],
    lab: null,
    weight: 0,
  }));

const computeAverageFromSegments = segments => {
  let totalWeight = 0;
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  for (const segment of segments) {
    if (!segment.lab || !segment.weight) continue;
    totalWeight += segment.weight;
    sumR += segment.rgb[0] * segment.weight;
    sumG += segment.rgb[1] * segment.weight;
    sumB += segment.rgb[2] * segment.weight;
  }

  if (!totalWeight) return null;

  const avgR = clamp(Math.round(sumR / totalWeight));
  const avgG = clamp(Math.round(sumG / totalWeight));
  const avgB = clamp(Math.round(sumB / totalWeight));
  return {
    rgb: [avgR, avgG, avgB],
    lab: rgbToLab(avgR, avgG, avgB),
  };
};

const computeEdgeSegments = (imageData, orientation) => {
  const { data, width, height } = imageData;
  const sectorCount = Math.max(1, EDGE_SECTOR_COUNT || 1);
  const segments = createEmptySegments(sectorCount);

  const primaryLength = orientation === 'horizontal' ? width : height;
  const secondaryLength = orientation === 'horizontal' ? height : width;
  const sectorSize = primaryLength / sectorCount;

  for (let secondary = 0; secondary < secondaryLength; secondary += 1) {
    for (let primary = 0; primary < primaryLength; primary += 1) {
      const x = orientation === 'horizontal' ? primary : secondary;
      const y = orientation === 'horizontal' ? secondary : primary;
      const idx = (y * width + x) * 4;

      const alpha = data[idx + 3];
      if (!alpha) continue;

      const sectorIndex = Math.min(
        sectorCount - 1,
        Math.floor(primary / sectorSize)
      );
      const segment = segments[sectorIndex];
      segment.rgb[0] += data[idx];
      segment.rgb[1] += data[idx + 1];
      segment.rgb[2] += data[idx + 2];
      segment.weight += 1;
    }
  }

  return segments.map(segment => {
    if (!segment.weight) {
      return {
        ...segment,
        rgb: [0, 0, 0],
        lab: null,
      };
    }

    const avgR = clamp(Math.round(segment.rgb[0] / segment.weight));
    const avgG = clamp(Math.round(segment.rgb[1] / segment.weight));
    const avgB = clamp(Math.round(segment.rgb[2] / segment.weight));

    return {
      ...segment,
      rgb: [avgR, avgG, avgB],
      lab: rgbToLab(avgR, avgG, avgB),
    };
  });
};

const processEdge = (imageData, orientation) => {
  const segments = computeEdgeSegments(imageData, orientation);
  const average = computeAverageFromSegments(segments);

  return {
    average,
    segments,
    rgb: average?.rgb || null,
    lab: average?.lab || null,
  };
};

export const analyzeTileEdges = imageUrl =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context is not available'));
          return;
        }

        ctx.drawImage(image, 0, 0);

        const top = ctx.getImageData(0, 0, image.width, EDGE_SAMPLE_SIZE);
        const bottom = ctx.getImageData(
          0,
          Math.max(0, image.height - EDGE_SAMPLE_SIZE),
          image.width,
          EDGE_SAMPLE_SIZE
        );
        const left = ctx.getImageData(0, 0, EDGE_SAMPLE_SIZE, image.height);
        const right = ctx.getImageData(
          Math.max(0, image.width - EDGE_SAMPLE_SIZE),
          0,
          EDGE_SAMPLE_SIZE,
          image.height
        );

        resolve({
          up: processEdge(top, 'horizontal'),
          down: processEdge(bottom, 'horizontal'),
          left: processEdge(left, 'vertical'),
          right: processEdge(right, 'vertical'),
        });
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = reject;
    image.src = imageUrl;
  });

export const deltaE = (labA, labB) => {
  if (!labA || !labB) return Number.POSITIVE_INFINITY;
  const [L1, a1, b1] = labA;
  const [L2, a2, b2] = labB;
  const dL = L1 - L2;
  const da = a1 - a2;
  const db = b1 - b2;
  return Math.sqrt(dL * dL + da * da + db * db);
};

export const OPPOSITE_RULE_MAP = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
};

export const edgesAreCompatible = (sourceEdge, targetEdge, tolerance) => {
  if (!sourceEdge || !targetEdge) return false;

  const sourceSegments = Array.isArray(sourceEdge.segments)
    ? sourceEdge.segments
    : [];
  const targetSegments = Array.isArray(targetEdge.segments)
    ? targetEdge.segments
    : [];

  const segmentCount = Math.min(sourceSegments.length, targetSegments.length);
  let comparisons = 0;
  let totalDelta = 0;
  let maxDelta = 0;

  for (let i = 0; i < segmentCount; i += 1) {
    const sourceSegment = sourceSegments[i];
    const targetSegment = targetSegments[i];

    if (!sourceSegment?.lab || !targetSegment?.lab) continue;

    const currentDelta = deltaE(sourceSegment.lab, targetSegment.lab);

    comparisons += 1;
    totalDelta += currentDelta;
    if (currentDelta > maxDelta) maxDelta = currentDelta;
  }

  if (!comparisons) {
    if (sourceEdge?.lab && targetEdge?.lab) {
      return deltaE(sourceEdge.lab, targetEdge.lab) <= tolerance;
    }
    return false;
  }

  const averageDelta = totalDelta / comparisons;
  if (averageDelta > tolerance) return false;

  if (maxDelta > tolerance * 1.35) return false;

  return true;
};
