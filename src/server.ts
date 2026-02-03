import express from "express";
import type { Request, Response } from "express";
import { getLevelSvg } from "./lib/levels.js";
import { getSkillSvg, getImageFromUrl } from "./lib/skills.js";
import { generateProgressSvg } from "./lib/generate.js";

const app = express();
const port = 3000;

/**
 * Get the progress SVG for a given skill and level
 * @param req - The request object
 * @param res - The response object
 * @returns The progress SVG
 */
app.get("/progress", async (req: Request, res: Response) => {
    // Get query parameters
    const skill = req.query.skill as string;
    const image = req.query.image as string;
    const level = Number(req.query.level);

    // Validate level
    if (!level) {
        res.status(400).send("Missing level");
        return;
    }

    if (!level || level < 1 || level > 5) {
        res.status(400).send("Level must be between 1 and 5");
        return;
    }

    // get level svg based on level param
    const levelSvg = getLevelSvg(level);

    // Generate progress svg
    if (skill) {
        // get svg image from skill
        try {
            const skillSvg = await getSkillSvg(skill);
            if (!skillSvg || !levelSvg) {
                res.status(400).send("Failed to fetch skill or level icon");
                return;
            }
            const progressSvg = generateProgressSvg(skillSvg, levelSvg);
            res.send(progressSvg);
        } catch (error) {
            console.error(error);
            res.status(500).send("Failed to fetch skill icon");
            return;
        }
    } else if (image) {
        // TODO: Generate progress svg for arbitrary image
        const customImage = await getImageFromUrl(image);
        if (!customImage || !levelSvg) {
            res.status(400).send("Failed to fetch image or level icon");
            return;
        }
        const progressSvg = generateProgressSvg(customImage, levelSvg);
        res.send(progressSvg);
    } else {
        res.status(400).send("Missing skill or image");
        return;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
