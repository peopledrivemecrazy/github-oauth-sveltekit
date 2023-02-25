import { getUser } from '$lib/vendor/github';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}
	const token = event.cookies.get('token') as string;
	if (token) {
		event.locals.user = await getUser(token);
	}
	const response = await resolve(event);
	return response;
};
