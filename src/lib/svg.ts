import { DOMParser } from "xmldom";

const parser = new DOMParser();

const parseSvg = (source: string): SVGElement => {
    return parser.parseFromString(source, "image/svg+xml")
        .documentElement as unknown as SVGElement;
};

export { parseSvg };
