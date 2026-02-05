import type { CustomImage } from './skills.js';
import { parseSvg } from './svg.js';

class CacheEntry {
    constructor(public image: CustomImage, public timestamp: number) {
        this.image = image;
        this.timestamp = Date.now();
    }

    isExpired() {
        return Date.now() - this.timestamp > cacheTTL;
    }
}

const cacheMap = new Map<string, CacheEntry>();

const supportedImageMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/svg+xml',
];

const cacheTTL = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

const fetchImage = async (url: string): Promise<CustomImage> => {
    // Fetch image
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch custom image: ${response.statusText}`);
    }

    // Validate image type
    const contentType = response.headers.get('content-type');
    if (!contentType) {
        throw new Error('Failed to fetch custom image: No content type');
    }
    if (!contentType.includes('image/')) {
        throw new Error('Failed to fetch custom image: Not an image');
    }

    // Parse image based on type
    let image: CustomImage;
    if (contentType.includes('image/svg+xml')) {
        const svg = parseSvg(await response.text());
        svg.setAttribute('width', '48');
        svg.setAttribute('height', '48');
        image = {
            mimeType: contentType,
            data: svg,
        };
    } else if (supportedImageMimeTypes.includes(contentType)) {
        image = {
            mimeType: contentType,
            data: Buffer.from(await response.arrayBuffer()).toString('base64'),
        };
    } else {
        throw new Error('Failed to fetch custom image: Unsupported image type');
    }

    return image;
};

const fetchWithCache = async (
    imageUrl: string
): Promise<CustomImage | null> => {
    // Check cache and return if found
    if (cacheMap.has(imageUrl)) {
        const cacheEntry = cacheMap.get(imageUrl);
        if (cacheEntry && !cacheEntry.isExpired()) {
            console.log(`Cache hit for ${imageUrl}`);
            return cacheEntry.image;
        } else {
            console.log(`Cache expired for ${imageUrl}`);
            cacheMap.delete(imageUrl);
        }
    }

    // Fetch image
    const image = await fetchImage(imageUrl);

    // Cache image
    cacheMap.set(imageUrl, new CacheEntry(image, Date.now()));
    console.log(`Cached ${imageUrl}`);

    // Return image
    return image;
};

export { fetchWithCache };
