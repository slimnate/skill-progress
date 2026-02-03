import fs from "fs";
import path from "path";
import { parseSvg } from "./svg.js";
import { fetchWithCache } from "./cache.js";

type CustomImage = {
    mimeType: string;
    data: SVGElement | string;
};

const skillFileMap = new Map<string, string>([
    ["convex", "./img/Convex-Dark.svg"],
]);

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

    return getImageFromUrl(`https://skillicons.dev/icons?i=${skill}`);
};

/**
 * Get the custom image for a given image URL
 * @param imageUrl - The URL of the image to fetch
 * @returns The image SVG
 */
const getImageFromUrl = async (
    imageUrl: string
): Promise<CustomImage | null> => {
    return await fetchWithCache(imageUrl);
};

export { getSkillSvg, getImageFromUrl };
export type { CustomImage };
