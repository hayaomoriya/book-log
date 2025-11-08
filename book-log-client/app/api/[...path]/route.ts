import { NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

async function handler(req: NextRequest, ctx: { params: { path?: string[] } }) {
  const { params } = ctx;
  const path = (await params)?.path?.join("/");

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: "manual",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.arrayBuffer();
    init.body = body;
  }
  const upstream = await fetch(`${API_BASE_URL}/${path}`, init);
  const responseHeaders = new Headers(upstream.headers);

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
  handler as HEAD,
};
