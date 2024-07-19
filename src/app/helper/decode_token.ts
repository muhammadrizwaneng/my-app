const decodeLoginToken = require("./decode_login_token");
import Cookies from "js-cookie";

export const extractUserDataFromToken = async (userToken: string) => {
  if (!userToken) {
    return null;
  }

  const userRecord = decodeLoginToken.extractEmailAndIdFromToken(userToken);

  if (!userRecord || !userRecord.email) {
    Cookies.remove("tokenforpython", { path: "/" });
    return null;
  } else {
    return userRecord
  }

  // let userData;
  // try {
  //   userData = JSON.parse(userRecord.userData);
  // } catch (e) {
  //   Cookies.remove("tokenforpython", { path: "/" });
  //   return null;
  // }

  // if (userData) {
  //   userData.email = userRecord.email;
  //   userData._id = userRecord._id;
  //   return userData;
  // } else {
  //   Cookies.remove("tokenforpython", { path: "/" });
  //   return null;
  // }
};
export const removeCookiesFromMiddleware = async () => {
  Cookies.remove("tokenforpython", {
    path: "/",
  });
  return "logout";
};
// export const removerspToken = async () => {
//   Cookies.remove("rsp", {
//     path: "/",
//   });
//   return "logout";
// };
