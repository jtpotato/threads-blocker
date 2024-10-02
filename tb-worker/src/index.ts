export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

type BlockUserRequestBody = {
	username: string | undefined;
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.url.endsWith('/add')) {
			const body = await request.text();
			const data: BlockUserRequestBody = JSON.parse(body);

			if (!data.username) {
				return new Response('Username is required', { status: 400 });
			}

			// console.log(data.username);
			// check if user is already blocked
			const user = await env.DB.prepare(`SELECT * FROM blocked_users WHERE username = ?`).bind(data.username).first();

			// console.log(user);

			if (user) {
				// increment blocked_times
				const result = await env.DB.exec(`UPDATE blocked_users SET blocked_times = blocked_times + 1 WHERE username = '${data.username}'`);
			} else {
				// add user to blocked_users table
				const result = await env.DB.exec(`INSERT INTO blocked_users (username, blocked_times) VALUES ('${data.username}', 1)`);
			}

			return new Response('User blocked', { status: 200 });
		}

		// fetch
		if (request.url.endsWith('/fetch')) {
			const { results } = await env.DB.prepare(`SELECT * FROM blocked_users`).all();
			// convert to space-delimited string
			const blocked_users = results.map((user) => user.username).join(' ');
			// make response cached for 1 day
			const headers = new Headers({ 'Cache-Control': 'public, max-age=86400' });
			return new Response(blocked_users, { headers });
		}
		// return 404
		return new Response('Not found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
