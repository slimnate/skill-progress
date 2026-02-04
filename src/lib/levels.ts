import fs from 'fs';
import path from 'path';
import { parseSvg } from './svg.js';
import { applyColors } from './colors.js';

const levels = new Map<string, SVGElement>();

const getImgPath = (filename: string): string =>
    path.join(process.cwd(), 'img', filename);

/**
 * Load the level SVG for a given level
 * @param level - The level to load
 * @returns The level SVG
 */
const loadLevel = (fileName: string): SVGElement => {
    // let svg = parseSvg(fs.readFileSync(getImgPath(`${level}-new.svg`), "utf8"));
    let svg = parseSvg(fs.readFileSync(getImgPath(`${fileName}.svg`), 'utf8'));
    svg.setAttribute('width', '48');
    svg.setAttribute('height', '8');
    return svg;
};

levels.set('flat-1', loadLevel('flat-1'));
levels.set('flat-2', loadLevel('flat-2'));
levels.set('flat-3', loadLevel('flat-3'));
levels.set('flat-4', loadLevel('flat-4'));
levels.set('flat-5', loadLevel('flat-5'));

levels.set('rounded-1', loadLevel('rounded-1'));
levels.set('rounded-2', loadLevel('rounded-2'));
levels.set('rounded-3', loadLevel('rounded-3'));
levels.set('rounded-4', loadLevel('rounded-4'));
levels.set('rounded-5', loadLevel('rounded-5'));

/**
 * Get the level SVG for a given level
 * @param level - The level to get the SVG for (1-5)
 * @returns The level SVG
 */
const getLevelSvg = (
    level: number,
    style: string,
    startColor: string | undefined,
    endColor: string | undefined
): SVGElement | null => {
    let levelSvg = levels.get(`${style}-${level}`);
    if (!levelSvg) {
        return null;
    }

    return applyColors(levelSvg, startColor, endColor);
};

export { getLevelSvg };
