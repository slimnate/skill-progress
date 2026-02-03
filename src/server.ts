import express from "express";
import type { Request, Response } from "express";
import { getLevelSvg } from "./lib/levels.js";

const app = express();
const port = 3000;

app.get("/progress", (req: Request, res: Response) => {
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

    return res.send(levelSvg);

    // Generate progress svg
    if (skill) {
        // get svg image from skill
    } else if (image) {
        // TODO: Generate progress svg for image
    } else {
        res.status(400).send("Missing skill or image");
        return;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
