const jwt = require('jsonwebtoken');

// Define a function to extract email and id from the token
function extractEmailAndIdFromToken(user:Object) {
    const decode_token = jwt.decode(user);
    console.log("=--=-=decode_token",decode_token)
    if (decode_token == null || decode_token == "null" || decode_token == undefined) {
        return { email: undefined, _id: undefined };
    } else { 
        const { email, _id, first_name, last_name, number } = decode_token.sub;
        return { email, _id, first_name, last_name, number };
    }

}
module.exports = { extractEmailAndIdFromToken };