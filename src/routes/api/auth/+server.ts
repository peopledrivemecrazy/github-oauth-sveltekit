import { GITHUB_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_GITHUB_CLIENT_ID } from '$env/static/public';
import { getUser } from '$lib/vendor/github';
import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	console.log(url.searchParams.get('code'));
	const code = url.searchParams.get('code');

	const response = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		body: JSON.stringify({
			client_id: PUBLIC_GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			code
		}),
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
	});
	const token = await response.json();

	const user = await getUser(token.access_token);
	locals.user = user;

	cookies.set('token', `${token.access_token}`, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30
	});

	cookies.set('username', user.login, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(301, '/');
};
