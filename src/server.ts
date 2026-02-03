import express from 'express';
import { handleProgress } from './handlers/progress.js';
import type { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/progress', async (req: Request, res: Response) => {
    const q = req.query;
    const result = await handleProgress({
        ...(q.skill != null && { skill: String(q.skill) }),
        ...(q.image != null && { image: String(q.image) }),
        ...(q.level != null && { level: String(q.level) }),
        ...(q.size != null && { size: String(q.size) }),
        ...(q.startColor != null && { startColor: String(q.startColor) }),
        ...(q.endColor != null && { endColor: String(q.endColor) }),
    });
    res.status(result.statusCode);
    if (result.statusCode === 200) {
        res.type('image/svg+xml').send(result.body);
    } else {
        res.send(result.body);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
