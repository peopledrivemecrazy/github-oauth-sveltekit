<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import type { PageServerData } from './$types';
	const { PUBLIC_GITHUB_CLIENT_ID } = env;
	export let data: PageServerData;
	$: ({ repos } = data);
	const user = $page.data.user;
</script>

{#if user}
	<div class="grid">
		<div class="flex gap-4 items-center">
			<h1>
				Welcome {user.login}
			</h1>
			<a class="p-2 bg-teal-400 text-black" href="{base}/api/logout"> Logout </a>
		</div>

		<ul class="p-4 border my-4">
			{#each repos as { name }}
				<li>
					{name}
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<a
		class="p-2 bg-teal-400 text-black"
		href="https://github.com/login/oauth/authorize?scope=repo&response_type=code&client_id={PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:5173/api/auth"
	>
		login with GH
	</a>
{/if}
