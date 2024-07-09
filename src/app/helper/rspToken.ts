var jwt = require('jsonwebtoken');

export const rspToken = (rspToken:string) => {
    var email ;
    if (rspToken) {
        let decode_token = jwt.decode(rspToken);
        if (decode_token && decode_token.ssoEmailToken) {
            const decodedString = Buffer.from(
                decode_token.ssoEmailToken,
                "base64"
            ).toString("utf8");
            const splitDecodeString = decodedString.split(":/:");
            const user_data_decode = Buffer.from(splitDecodeString[1], "base64").toString(
                "utf8"
            );
            const decodedData = JSON.parse(user_data_decode)
            email = decodedData.email;
        } else {
            // location.href = "/logout?ac=jik";
            return null

        }
    } else {
        // location.href = "/logout?ac=jik2";
        return null
    }
    return email
}