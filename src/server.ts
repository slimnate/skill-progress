import express from "express";
import { getSkillSvg, getImageFromUrl } from "./lib/skills.js";
import { generateProgressSvg } from "./lib/generate.js";

import type { Request, Response } from "express";
import type { CustomImage } from "./lib/skills.js";

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
    const size = Number(req.query.size) || 48;

    // Validate size
    if (!size || size < 16 || size > 512) {
        res.status(400).send("Size must be between 16 and 512");
        return;
    }

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

    // Parse skill image from skill or image param
    let skillImage: CustomImage | null = null;
    try {
        if (skill) {
            skillImage = await getSkillSvg(skill);
        } else if (image) {
            skillImage = await getImageFromUrl(image);
        } else {
            res.status(400).send("Missing skill or image");
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch skill or image");
        return;
    }

    // Validate skill image
    if (!skillImage) {
        res.status(400).send("Failed to fetch skill or image");
        return;
    }

    // Generate progress SVG
    try {
        const progressSvg = generateProgressSvg(skillImage, level, size);
        res.send(progressSvg);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate progress SVG");
        return;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
