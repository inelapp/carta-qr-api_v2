import crypto from 'crypto';
import { GenericObject } from 'moleculer';

function generateSha256Hash(data: string): string {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash;
}

function sortObjectByKeys(obj: GenericObject): GenericObject {
    return Object.keys(obj)
        .sort()
        .reduce((sortedObj, key) => {
            (sortedObj as any)[key] = obj[key];
            return sortedObj;
        }, {});
}

function singClientRequest(secretKey: string, body: GenericObject, timestamp: number) {
    const data = JSON.stringify(sortObjectByKeys(body)) + timestamp;
    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}

export { generateSha256Hash, singClientRequest }