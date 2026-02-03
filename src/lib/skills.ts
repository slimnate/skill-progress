const getSkillSvg = async (skill: string): Promise<string> => {
    // TODO: Add support for custom skill icons (e.g. Convex)

    const response = await fetch(`https://skillicons.dev/icons?i=${skill}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch skill icon: ${response.statusText}`);
    }
    return await response.text();
};

export { getSkillSvg };
