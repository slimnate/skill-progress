import fs from "fs";
import path from "path";
import { parseSvg } from "./svg.js";

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
const getSkillSvg = async (skill: string): Promise<SVGElement | null> => {
    // Check for custom skills before fetching from skill-icons
    if (customSkills.has(skill)) {
        return customSkills.get(skill) || null;
    }

    const response = await fetch(`https://skillicons.dev/icons?i=${skill}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch skill icon: ${response.statusText}`);
    }

    // Parse the SVG and set the width and height to 48px
    let svg = parseSvg(await response.text());
    svg.setAttribute("width", "48");
    svg.setAttribute("height", "48");
    return svg;
};

export { getSkillSvg };
