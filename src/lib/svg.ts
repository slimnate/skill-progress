import { DOMParser } from "xmldom";

const parser = new DOMParser();

/**
 * Parse the SVG source and return the SVG element
 * @param source - The SVG source to parse
 * @returns The SVG element
 */
const parseSvg = (source: string): SVGElement => {
    return parser.parseFromString(source, "image/svg+xml")
        .documentElement as unknown as SVGElement;
};

export { parseSvg };
