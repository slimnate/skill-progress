import { getSkillSvg, getImageFromUrl } from '../lib/skills.js';
import { generateProgressSvg } from '../lib/generate.js';
import { validateColor } from '../lib/colors.js';
import type { CustomImage } from '../lib/skills.js';

export type ProgressParams = {
    skill?: string;
    image?: string;
    level?: string;
    style?: string;
    size?: string;
    startColor?: string;
    endColor?: string;
};

export type ProgressResult = {
    statusCode: number;
    body: string;
    headers?: Record<string, string>;
};

export async function handleProgress(
    params: ProgressParams,
): Promise<ProgressResult> {
    const skill = params.skill;
    const image = params.image;
    const level = Number(params.level);
    const style = params.style || 'rounded';
    const size = Number(params.size) || 48;
    const startColor = params.startColor;
    const endColor = params.endColor;

    // Validate colors (if provided)
    if (startColor || endColor) {
        if ((startColor && !endColor) || (!startColor && endColor)) {
            return {
                statusCode: 400,
                body: 'Start and end colors must be provided together',
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            };
        }
        if (!validateColor(startColor!)) {
            return {
                statusCode: 400,
                body: 'Invalid start color: ' + startColor,
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            };
        }
        if (!validateColor(endColor!)) {
            return {
                statusCode: 400,
                body: 'Invalid end color: ' + endColor,
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            };
        }
    }

    // Validate size
    if (!size || size < 16 || size > 512) {
        return {
            statusCode: 400,
            body: 'Size must be between 16 and 512',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        };
    }

    // Validate style
    if (style !== 'rounded' && style !== 'flat') {
        return {
            statusCode: 400,
            body: 'Invalid style',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        };
    }

    // Resolve skill or image
    let skillImage: CustomImage | null = null;
    try {
        if (skill) {
            skillImage = await getSkillSvg(skill);
        } else if (image) {
            skillImage = await getImageFromUrl(image);
        } else {
            return {
                statusCode: 400,
                body: 'Missing skill or image',
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Failed to fetch skill or image',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        };
    }

    if (!skillImage) {
        return {
            statusCode: 400,
            body: 'Failed to fetch skill or image',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        };
    }

    // Generate and return response
    try {
        const progressSvg = generateProgressSvg(
            skillImage,
            level,
            style,
            size,
            startColor,
            endColor,
        );
        return {
            statusCode: 200,
            body: progressSvg,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=86400',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Failed to generate progress SVG',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        };
    }
}
