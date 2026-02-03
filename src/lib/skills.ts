import fs from "fs";
import path from "path";
import { parseSvg } from "./svg.js";

type CustomImage = {
    mimeType: string;
    data: SVGElement | string;
};

const skillFileMap = new Map<string, string>([
    ["convex", "./img/Convex-Dark.svg"],
]);

const supportedImageTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
];

/**
 * Load the custom skills from the file map
 * @returns A map of skill names to SVG elements
 */
const loadCustomSkills = (): Map<string, SVGElement> => {
    const skills = new Map<string, SVGElement>();
    for (const [skill, file] of skillFileMap.entries()) {
        // Parse the SVG and set the width and height to 48px
        let svg = parseSvg(fs.readFileSync(path.resolve(file), "utf8"));
        svg.setAttribute("width", "48");
        svg.setAttribute("height", "48");
        skills.set(skill, svg);
    }
    return skills;
};

const customSkills = loadCustomSkills();

/**
 * Get the skill SVG for a given skill
 * @param skill - The skill to get the SVG for
 * @returns The skill SVG
 */
const getSkillSvg = async (skill: string): Promise<CustomImage | null> => {
    // Check for custom skills before fetching from skill-icons
    if (customSkills.has(skill)) {
        return {
            mimeType: "image/svg+xml",
            data: customSkills.get(skill) as SVGElement,
        };
    }

    const response = await fetch(`https://skillicons.dev/icons?i=${skill}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch skill icon: ${response.statusText}`);
    }

    // Parse the SVG and set the width and height to 48px
    let svg = parseSvg(await response.text());
    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    return {
        mimeType: "image/svg+xml",
        data: svg,
    };
};

/**
 * Get the custom image for a given image URL
 * @param imageUrl - The URL of the image to fetch
 * @returns The image SVG
 */
const getCustomImage = async (
    imageUrl: string
): Promise<CustomImage | null> => {
    const response = await fetch(imageUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch custom image: ${response.statusText}`);
    }

    const imageType = response.headers.get("content-type");
    if (!imageType) {
        throw new Error("Failed to fetch custom image: No content type");
    }
    if (!imageType.includes("image/")) {
        throw new Error("Failed to fetch custom image: Not an image");
    }

    if (imageType.includes("image/svg+xml")) {
        const svg = parseSvg(await response.text());
        svg.setAttribute("width", "48");
        svg.setAttribute("height", "48");
        return {
            mimeType: imageType,
            data: svg,
        };
    } else if (supportedImageTypes.includes(imageType)) {
        return {
            mimeType: imageType,
            data: Buffer.from(await response.arrayBuffer()).toString("base64"),
        };
    } else {
        throw new Error("Failed to fetch custom image: Unsupported image type");
    }
};

export { getSkillSvg, getCustomImage };
export type { CustomImage };
