import { parseSvg } from "./svg.js";

const validateColor = (color: string): boolean => {
    return /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(color);
};

const defaultStartColor = "#fdff60";
const defaultEndColor = "#00ff41";

const applyColors = (
    svg: SVGElement,
    startColor: string | undefined,
    endColor: string | undefined
): SVGElement => {
    let str = `${svg}`;

    if (startColor) {
        str = str.replace(defaultStartColor, `#${startColor}`);
    }
    if (endColor) {
        str = str.replace(defaultEndColor, `#${endColor}`);
    }

    return parseSvg(str);
};

export { validateColor, applyColors };
