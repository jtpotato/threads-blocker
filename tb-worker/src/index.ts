export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

type BlockUserRequestBody = {
	username: string | undefined;
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const headers = new Headers({
			'Access-Control-Allow-Origin': '*', // Change '*' to your extension's origin for better security
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		});

		if (request.method === 'OPTIONS') {
			// Handle preflight requests
			return new Response(null, {
				status: 204,
				headers: headers,
			});
		}

		if (request.url.endsWith('/add')) {
			const body = await request.text();
			const data: BlockUserRequestBody = JSON.parse(body);

			if (!data.username) {
				return new Response('Username is required', { status: 400, headers });
			}

			// Check if user is already blocked
			const user = await env.DB.prepare(`SELECT * FROM blocked_users WHERE username = ?`).bind(data.username).first();

			if (user) {
				// Increment blocked_times
				const result = await env.DB.exec(`UPDATE blocked_users SET blocked_times = blocked_times + 1 WHERE username = '${data.username}'`);
			} else {
				// Add user to blocked_users table
				const result = await env.DB.exec(`INSERT INTO blocked_users (username, blocked_times) VALUES ('${data.username}', 1)`);
			}

			return new Response('User blocked', { status: 200, headers });
		}

		// Handle fetch request
		if (request.url.endsWith('/fetch')) {
			const { results } = await env.DB.prepare(`SELECT * FROM blocked_users`).all();
			// Convert to space-delimited string
			const blocked_users = results.map((user) => user.username).join(' ');
			// Make response cached for 2 hours
			const cacheHeaders = new Headers({ 'Cache-Control': 'public, max-age=7200' });
			headers.append('Cache-Control', cacheHeaders.get('Cache-Control')!);
			return new Response(blocked_users, { headers });
		}

		// Return 404
		return new Response('Not found', { status: 404, headers });
	},
} satisfies ExportedHandler<Env>;
