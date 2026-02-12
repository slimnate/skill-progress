import type { CustomImage } from './skills.js';
import { parseSvg } from './svg.js';
import { getLevelSvg } from './levels.js';

const resizeSvg = (svg: string, size: number): string => {
    const svgElement = parseSvg(svg);
    svgElement.setAttribute('width', size.toString());
    svgElement.setAttribute('height', size.toString());
    return `${svgElement}`;
};

/**
 * Generate the progress SVG for a given skill and level
 * @param skillImage - The SVG element for the skill
 * @param levelSvg - The SVG element for the level
 * @returns The progress SVG
 */
const generateProgressSvg = (
    skillImage: CustomImage,
    level: number,
    style: string,
    size: number,
    startColor: string | undefined,
    endColor: string | undefined,
): string => {
    const levelSvg = getLevelSvg(level, style, startColor, endColor);

    const imageData = skillImage.mimeType.includes('image/svg+xml')
        ? `<g transform="translate(0, 0)">${skillImage.data as SVGElement}</g>`
        : `<image href="data:${skillImage.mimeType};base64,${skillImage.data}" width="48" height="48" />`;

    const levelData = levelSvg
        ? `<g transform="translate(0, 48)">${levelSvg}</g>`
        : '';

    const svgData = `
        <svg width="48px" height="48px" viewBox="0 0 48 ${levelSvg ? '56' : '48'}" xmlns="http://www.w3.org/2000/svg">
            ${imageData}
            ${levelData}
        </svg>
    `;

    return resizeSvg(svgData, size);
};

export { generateProgressSvg };
