import crypto from 'crypto';
const SECRET = "E_COMMERCE_API"
export const random = () => {
    return crypto.randomBytes(128).toString('base64');
}

export const authentication =(salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}