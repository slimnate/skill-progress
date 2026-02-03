import type { CustomImage } from "./skills.js";

/**
 * Generate the progress SVG for a given skill and level
 * @param skillSvg - The SVG element for the skill
 * @param levelSvg - The SVG element for the level
 * @returns The progress SVG
 */
const generateProgressSvg = (
    skillSvg: CustomImage,
    levelSvg: SVGElement
): string => {
    if (skillSvg.mimeType.includes("image/svg+xml")) {
        return `
            <svg width="48px" height="48px" viewBox="0 0 48 53" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                    ${skillSvg.data as SVGElement}
                </g>
                <g transform="translate(0, 48)">
                    ${levelSvg}
                </g>
            </svg>
        `;
    } else {
        return `
            <svg width="48px" height="48px" viewBox="0 0 48 53" xmlns="http://www.w3.org/2000/svg">
                <image href="data:${skillSvg.mimeType};base64,${skillSvg.data}" width="48" height="48" />
                <g transform="translate(0, 48)">
                    ${levelSvg}
                </g>
            </svg>
        `;
    }
};

export { generateProgressSvg };
