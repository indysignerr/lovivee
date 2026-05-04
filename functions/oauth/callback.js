// GET /oauth/callback?code=xxx → échange le code contre un token, postMessage à Decap
const html = (status, payload, allowedOrigin) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorization</title></head><body><script>
(function () {
  function postMsg(msg) {
    if (window.opener) window.opener.postMessage(msg, ${JSON.stringify(allowedOrigin)});
  }
  function receive(e) {
    if (e.data === "authorizing:github") {
      postMsg("authorization:github:${status}:" + ${JSON.stringify(JSON.stringify(payload))});
    }
  }
  window.addEventListener("message", receive, false);
  postMsg("authorizing:github");
})();
</script><p>Authorization complete. You can close this window.</p></body></html>`;

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const allowedOrigin = env.ALLOWED_ORIGIN ?? url.origin;
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response(html("error", { message: "Missing code" }, allowedOrigin), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: env.OAUTH_CLIENT_ID,
        client_secret: env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (!data.access_token) {
      return new Response(
        html("error", { message: data.error_description ?? data.error ?? "Token exchange failed" }, allowedOrigin),
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return new Response(
      html("success", { token: data.access_token, provider: "github" }, allowedOrigin),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    return new Response(
      html("error", { message: err.message }, allowedOrigin),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
