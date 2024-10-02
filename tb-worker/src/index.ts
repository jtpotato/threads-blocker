/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

type BlockUserRequestBody = {
	username: string;
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.url.endsWith('/add')) {
			const body = await request.text();
			const data: BlockUserRequestBody = JSON.parse(body);
			// check if user is already blocked
			const user = await env.DB.prepare(`SELECT * FROM blocked_users WHERE username = ${data.username}`).bind(env.DB).first();

			const result = await env.DB.exec(`INSERT INTO blocked_users (username, blocked_times) VALUES (${data.username}, 1)`);
		}
		// return 404
		return new Response('Not found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
