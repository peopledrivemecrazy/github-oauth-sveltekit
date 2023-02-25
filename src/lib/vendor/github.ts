const userURL = 'https://api.github.com/user';

export const getUser = async (accessToken: string) => {
	const response = await fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
};

export const getRepos = async (username: string, token: string) => {
	const response = await fetch(`https://api.github.com/users/${username}/repos`, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});
	return response.json();
};
