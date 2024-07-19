// import { removerspToken } from "./app/helper/decode_token";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";
const extractUserData = require("@/app/helper/decode_token");
// import {extractUserData} from '@/app/helper/decode_token'
// import { rspToken } from "@/app/helper/rspToken";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const completeUrl = request.url;
  const urls = new URL(completeUrl);
  const serviceUrl = urls.searchParams.get("serviceUrl");
  const returnUrl = urls.searchParams.get("returnUrl");
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get("tokenforpython");
  // const RspToken = request.cookies.get("rsp");
  const accessToken = isLogin?.value;
  let email = "";
  let userData = "";
  // if (RspToken?.value) {
  //   email = rspToken(RspToken?.value);
  //   if (!email) {
  //     await extractUserData.removerspToken();
  //   }
  // }
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
