import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;

async function verifyToken(token) {
    try {
        const decoded = await jwt.verify(token, tokenSecret);
        console.log('token verified');
        console.log('decoded payload:', decoded);
        return decoded;
    } catch (err) {
        console.log('failed to authenticate token:', err.message);
        throw err;
    }
}

verifyToken(process.env.TEST_TOKEN).catch(console.error);