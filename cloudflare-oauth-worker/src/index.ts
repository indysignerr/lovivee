/**
 * Cloudflare Worker — Decap CMS GitHub OAuth proxy
 *
 * Implements the OAuth flow that Decap CMS expects when using:
 *   backend:
 *     name: github
 *     base_url: https://decap-oauth.<your>.workers.dev
 *     auth_endpoint: auth
 *
 * Two routes:
 *   GET /auth      → 302 to GitHub OAuth authorize
 *   GET /callback  → exchange code → postMessage to opener (Decap)
 *
 * Required secrets (set with `wrangler secret put`):
 *   OAUTH_CLIENT_ID      — GitHub OAuth App client_id
 *   OAUTH_CLIENT_SECRET  — GitHub OAuth App client_secret
 *
 * Optional vars (in wrangler.toml [vars]):
 *   ALLOWED_ORIGIN       — your admin URL, e.g. https://lovive.fr
 *   SCOPE                — defaults to "repo,user"
 */

export interface Env {
  OAUTH_CLIENT_ID: string;
  OAUTH_CLIENT_SECRET: string;
  ALLOWED_ORIGIN?: string;
  SCOPE?: string;
}

const html = (status: "success" | "error", payload: unknown, allowedOrigin: string) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorization</title></head><body><script>
(function () {
  function postMsg(msg) {
    if (window.opener) {
      window.opener.postMessage(msg, ${JSON.stringify(allowedOrigin)});
    }
  }
  function receive(e) {
    if (e.data === "authorizing:github") {
      postMsg("authorization:github:${status}:${JSON.stringify(payload).replace(/"/g, '\\"')}");
    }
  }
  window.addEventListener("message", receive, false);
  postMsg("authorizing:github");
})();
</script><p>Authorization complete. You can close this window.</p></body></html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const allowedOrigin = env.ALLOWED_ORIGIN ?? "*";
    const scope = env.SCOPE ?? "repo,user";

    if (url.pathname === "/" || url.pathname === "") {
      return new Response("Decap CMS OAuth proxy. Use /auth.", { status: 200 });
    }

    if (url.pathname === "/auth") {
      const state = crypto.randomUUID();
      const ghAuth = new URL("https://github.com/login/oauth/authorize");
      ghAuth.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
      ghAuth.searchParams.set("redirect_uri", `${url.origin}/callback`);
      ghAuth.searchParams.set("scope", scope);
      ghAuth.searchParams.set("state", state);
      return Response.redirect(ghAuth.toString(), 302);
    }

    if (url.pathname === "/callback") {
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: env.OAUTH_CLIENT_ID,
            client_secret: env.OAUTH_CLIENT_SECRET,
            code,
          }),
        });

        const data = (await tokenRes.json()) as {
          access_token?: string;
          error?: string;
          error_description?: string;
        };

        if (!data.access_token) {
          return new Response(
            html(
              "error",
              { message: data.error_description ?? data.error ?? "Token exchange failed" },
              allowedOrigin
            ),
            {
              status: 400,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            }
          );
        }

        return new Response(
          html("success", { token: data.access_token, provider: "github" }, allowedOrigin),
          { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
      } catch (err) {
        return new Response(
          html("error", { message: (err as Error).message }, allowedOrigin),
          { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
