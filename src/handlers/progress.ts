import { getSkillSvg, getImageFromUrl } from '../lib/skills.js';
import { generateProgressSvg } from '../lib/generate.js';
import { validateColor } from '../lib/colors.js';
import type { CustomImage } from '../lib/skills.js';

export type ProgressParams = {
    skill?: string;
    image?: string;
    level?: string;
    size?: string;
    startColor?: string;
    endColor?: string;
};

export type ProgressResult =
    | { statusCode: 200; body: string }
    | { statusCode: 400 | 500; body: string };

export async function handleProgress(
    params: ProgressParams
): Promise<ProgressResult> {
    const skill = params.skill;
    const image = params.image;
    const level = Number(params.level);
    const size = Number(params.size) || 48;
    const startColor = params.startColor;
    const endColor = params.endColor;

    // Validate colors (if provided)
    if (startColor || endColor) {
        if ((startColor && !endColor) || (!startColor && endColor)) {
            return {
                statusCode: 400,
                body: 'Start and end colors must be provided together',
            };
        }
        if (!validateColor(startColor!)) {
            return {
                statusCode: 400,
                body: 'Invalid start color: ' + startColor,
            };
        }
        if (!validateColor(endColor!)) {
            return {
                statusCode: 400,
                body: 'Invalid end color: ' + endColor,
            };
        }
    }

    // Validate size
    if (!size || size < 16 || size > 512) {
        return {
            statusCode: 400,
            body: 'Size must be between 16 and 512',
        };
    }

    // Validate level
    if (!level) {
        return {
            statusCode: 400,
            body: 'Missing level',
        };
    }
    if (level < 1 || level > 5) {
        return {
            statusCode: 400,
            body: 'Level must be between 1 and 5',
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
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Failed to fetch skill or image',
        };
    }

    if (!skillImage) {
        return {
            statusCode: 400,
            body: 'Failed to fetch skill or image',
        };
    }

    try {
        const progressSvg = generateProgressSvg(
            skillImage,
            level,
            size,
            startColor,
            endColor
        );
        return { statusCode: 200, body: progressSvg };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Failed to generate progress SVG',
        };
    }
}
