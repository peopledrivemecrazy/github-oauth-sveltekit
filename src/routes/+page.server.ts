import { getRepos } from '$lib/vendor/github';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('token') as string;
	const username = cookies.get('username') as string;
	console.log({ token });

	return {
		repos: token ? getRepos(username, token) : []
	};
}) satisfies PageServerLoad;
