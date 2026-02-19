import type { Handler } from '@netlify/functions';
import { handleProgress } from '../../src/handlers/progress.js';

export const handler: Handler = async (event) => {
    const params = {
        skill: event.queryStringParameters?.skill,
        image: event.queryStringParameters?.image,
        level: event.queryStringParameters?.level,
        style: event.queryStringParameters?.style,
        size: event.queryStringParameters?.size,
        startColor: event.queryStringParameters?.startColor,
        endColor: event.queryStringParameters?.endColor,
    };

    const result = await handleProgress(params);

    return {
        statusCode: result.statusCode,
        headers: result.headers || {},
        body: result.body,
    };
};
