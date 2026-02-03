import fs from "fs";
import path from "path";
import { parseSvg } from "./svg.js";

const levels = new Map<number, SVGElement>();

/**
 * Load the level SVG for a given level
 * @param level - The level to load
 * @returns The level SVG
 */
const loadLevel = (level: number): SVGElement => {
    // Parse the SVG and set the width and height to 48px
    let svg = parseSvg(
        fs.readFileSync(path.resolve(`./img/skill-${level}.svg`), "utf8")
    );
    svg.setAttribute("width", "48");
    svg.setAttribute("height", "5");
    return svg;
};

levels.set(1, loadLevel(1));
levels.set(2, loadLevel(2));
levels.set(3, loadLevel(3));
levels.set(4, loadLevel(4));
levels.set(5, loadLevel(5));

/**
 * Get the level SVG for a given level
 * @param level - The level to get the SVG for (1-5)
 * @returns The level SVG
 */
const getLevelSvg = (level: number): SVGElement | null => {
    return levels.get(level) || null;
};

export { getLevelSvg };
