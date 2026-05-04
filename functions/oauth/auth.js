// GET /oauth/auth → redirige vers GitHub OAuth authorize
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const ghAuth = new URL("https://github.com/login/oauth/authorize");
  ghAuth.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
  ghAuth.searchParams.set("redirect_uri", `${url.origin}/oauth/callback`);
  ghAuth.searchParams.set("scope", env.SCOPE ?? "repo,user");
  ghAuth.searchParams.set("state", crypto.randomUUID());
  return Response.redirect(ghAuth.toString(), 302);
}
