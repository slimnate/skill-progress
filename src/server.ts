import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleProgress } from './handlers/progress.js';
import type { Request, Response } from 'express';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDist = path.resolve(__dirname, '../web/dist');

app.get('/progress', async (req: Request, res: Response) => {
    const q = req.query;
    const result = await handleProgress({
        ...(q.skill != null && { skill: String(q.skill) }),
        ...(q.image != null && { image: String(q.image) }),
        ...(q.level != null && { level: String(q.level) }),
        ...(q.style != null && { style: String(q.style) }),
        ...(q.size != null && { size: String(q.size) }),
        ...(q.startColor != null && { startColor: String(q.startColor) }),
        ...(q.endColor != null && { endColor: String(q.endColor) }),
    });
    res.status(result.statusCode);
    if (result.headers) {
        Object.entries(result.headers).forEach(([key, value]) => {
            res.setHeader(key, value);
        });
    }
    if (result.statusCode === 200) {
        res.type('image/svg+xml').send(result.body);
    } else {
        res.send(result.body);
    }
});

app.use(express.static(webDist));
app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(webDist, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
