// import { removerspToken } from "./app/helper/decode_token";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";
const extractUserData = require("@/app/helper/decode_token");


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get("tokenforpython");

  const accessToken = isLogin?.value;
  let userData = "";

  if (isLogin?.value) {
    try {
      userData = await extractUserData.extractUserDataFromToken(isLogin?.value);

      if (!userData) {
        Cookies.remove("tokenforpython", { path: "/" });
        await extractUserData.removeCookiesFromMiddleware();
      }
    } catch (error) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
  } else {
    await extractUserData.removeCookiesFromMiddleware();
  }

  if(!accessToken && request.nextUrl.pathname == "/logout"){
    return NextResponse.redirect(`${request.nextUrl.origin}/login`)
  }

  if (!accessToken && (url.pathname === "/home" || url.pathname === "/profile" || url.pathname === "/profile/")) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  return NextResponse.next();
}
