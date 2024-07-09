const jwt = require('jsonwebtoken');

// Define a function to extract email and id from the token
function extractEmailAndIdFromToken(user:Object) {
    const decode_token = jwt.decode(user);
    if (decode_token == null || decode_token == "null" || decode_token == undefined) {
        return { email: undefined, _id: undefined };
    } else {
        const decodedString = Buffer.from(decode_token.ssoEmailToken, 'base64').toString('utf8');
        if (decodedString.includes(":/:")) {     
            const splitDecodeString = decodedString.split(":/:");
            const spliToken = Buffer.from(splitDecodeString[1], 'base64').toString('utf8');
            const [email, _id,userData] = spliToken.split('|');
            return { email, _id,userData };
        } else {
            return { email: undefined, _id: undefined };
        }
    }

}
module.exports = { extractEmailAndIdFromToken };