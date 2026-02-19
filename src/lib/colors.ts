import { SVG } from './svg.js';

const validateColor = (color: string): boolean => {
    return /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(color);
};

const defaultStartColor = '#fdff60';
const defaultEndColor = '#00ff41';

const applyColors = (
    svg: SVG,
    startColor: string | undefined,
    endColor: string | undefined,
): SVG => {
    if (startColor) {
        svg.replaceColor(defaultStartColor, startColor);
    }
    if (endColor) {
        svg.replaceColor(defaultEndColor, endColor);
    }

    return svg;
};

export { validateColor, applyColors };
