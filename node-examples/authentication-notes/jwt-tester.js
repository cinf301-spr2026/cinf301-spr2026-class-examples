import jwt from 'jsonwebtoken';
const tokenSecret = "my-token-secret";

function verifyToken(token){
        jwt.verify(token, tokenSecret, (err, value) => {
            if (err) {
                console.log('failed to authenticate token');
            }
            else {
                console.log('token verified');
                const value = jwt.decode(token);
            }
        })}
verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vQGJhciIsImlhdCI6MTc0NDA1ODYzOCwiZXhwIjoxNzQ0MTQ1MDM4fQ.WW1FiVEVl0ef-xuQC35pjJAOryGQ1j1DQfBCS1aO7tE")