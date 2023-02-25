import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('token', {
		path: '/'
	});
	cookies.delete('username', {
		path: '/'
	});
	throw redirect(301, '/');
};
