// fetch http://localhost:8787/add with request body { useranme: "testuser" }

fetch('http://localhost:8787/add', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		username: 'testuser',
	}),
	// @ts-ignore
	verbose: true,
});
