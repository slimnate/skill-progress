import fs from 'fs';
import path from 'path';
import { SVG } from './svg.js';
import { fetchWithCache } from './cache.js';

type CustomImage = {
    mimeType: string;
    data: SVG | string;
};

const skillFileMap = new Map<string, string>([
    ['convex', 'Convex-Dark.svg'],
    ['workos', 'WorkOS-Dark.svg'],
    ['svg', 'SVG-Dark.svg'],
    ['ios', 'iOS-Dark.svg'],
    ['ios-light', 'iOS-Light.svg'],
    ['apple', 'Apple-Dark.svg'],
    ['apple-light', 'Apple-Light.svg'],
    ['cursor', 'Cursor-Dark.svg'],
    ['railway', 'Railway-Dark.svg'],
    ['chrome', 'Chrome-Dark.svg'],
    ['jira', 'Jira.svg'],
    ['salesforce', 'Salesforce-Dark.svg'],
    ['socketio', 'SocketIO-Dark.svg'],
    ['sourcetree', 'SourceTree.svg'],
    ['wpf', 'WPF-Dark.svg'],
]);

const getImgPath = (filename: string): string =>
    path.join(process.cwd(), 'img', 'icons', filename);

/**
 * Load the custom skills from the file map
 * @returns A map of skill names to SVG elements
 */
const loadCustomSkills = (): Map<string, SVG> => {
    const skills = new Map<string, SVG>();
    for (const [skill, file] of skillFileMap.entries()) {
        // Parse the SVG and set the width and height to 48px
        let svg = new SVG(fs.readFileSync(getImgPath(file), 'utf8'));
        svg.setAttribute('width', '48');
        svg.setAttribute('height', '48');
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
            mimeType: 'image/svg+xml',
            data: customSkills.get(skill) as SVG,
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
    imageUrl: string,
): Promise<CustomImage | null> => {
    return await fetchWithCache(imageUrl);
};

export { getSkillSvg, getImageFromUrl };
export type { CustomImage };
