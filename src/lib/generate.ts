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
 * @param skillSvg - The SVG element for the skill
 * @param levelSvg - The SVG element for the level
 * @returns The progress SVG
 */
const generateProgressSvg = (
    skillSvg: CustomImage,
    level: number,
    style: string,
    size: number,
    startColor: string | undefined,
    endColor: string | undefined
): string => {
    const levelSvg = getLevelSvg(level, style, startColor, endColor);

    let svgData: string;
    if (skillSvg.mimeType.includes('image/svg+xml')) {
        svgData = `
            <svg width="48px" height="48px" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                    ${skillSvg.data as SVGElement}
                </g>
                <g transform="translate(0, 48)">
                    ${levelSvg}
                </g>
            </svg>
        `;
    } else {
        svgData = `
            <svg width="48px" height="48px" viewBox="0 0 48 53" xmlns="http://www.w3.org/2000/svg">
                <image href="data:${skillSvg.mimeType};base64,${skillSvg.data}" width="48" height="48" />
                <g transform="translate(0, 48)">
                    ${levelSvg}
                </g>
            </svg>
        `;
    }

    return resizeSvg(svgData, size);
};

export { generateProgressSvg };
