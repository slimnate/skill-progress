import type { CustomImage } from './skills.js';
import { parseSvg } from './svg.js';

type CecheEntry = {
    image: CustomImage;
    timestamp: number;
};

const cacheMap = new Map<string, CecheEntry>();

const supportedImageTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/svg+xml',
];

const cacheTTL = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

const fetchWithCache = async (
    imageUrl: string
): Promise<CustomImage | null> => {
    // Check cache and return if found
    if (cacheMap.has(imageUrl)) {
        console.log(`Cache hit for ${imageUrl}`);
        const cacheEntry = cacheMap.get(imageUrl);
        if (cacheEntry && Date.now() - cacheEntry.timestamp < cacheTTL) {
            return cacheEntry.image;
        } else {
            console.log(`Cache expired for ${imageUrl}`);
            cacheMap.delete(imageUrl);
        }
    }

    // Fetch image
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch custom image: ${response.statusText}`);
    }

    // Validate image type
    const imageType = response.headers.get('content-type');
    if (!imageType) {
        throw new Error('Failed to fetch custom image: No content type');
    }
    if (!imageType.includes('image/')) {
        throw new Error('Failed to fetch custom image: Not an image');
    }

    // Parse image based on type
    let image: CustomImage;
    if (imageType.includes('image/svg+xml')) {
        const svg = parseSvg(await response.text());
        svg.setAttribute('width', '48');
        svg.setAttribute('height', '48');
        image = {
            mimeType: imageType,
            data: svg,
        };
    } else if (supportedImageTypes.includes(imageType)) {
        image = {
            mimeType: imageType,
            data: Buffer.from(await response.arrayBuffer()).toString('base64'),
        };
    } else {
        throw new Error('Failed to fetch custom image: Unsupported image type');
    }

    // Cache image
    cacheMap.set(imageUrl, {
        image,
        timestamp: Date.now(),
    });
    console.log(`Cached ${imageUrl}`);

    // Return image
    return image;
};

export { fetchWithCache };
