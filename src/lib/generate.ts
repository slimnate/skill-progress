const generateProgressSvg = (
    skillSvg: SVGElement,
    levelSvg: SVGElement
): string => {
    return `
    <svg width="48px" height="48px" viewBox="0 0 48 53" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 0)">
            ${skillSvg}
        </g>
        <g transform="translate(0, 48)">
            ${levelSvg}
        </g>
    </svg>
    `;
};

export { generateProgressSvg };
