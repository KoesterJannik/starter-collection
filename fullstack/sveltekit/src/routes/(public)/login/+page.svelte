<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import { page } from '$app/stores';
	export let data: PageData;

	// Client API:
	const { form, errors, constraints, message } = superForm(data.form);
</script>

<div class="bgmainimage min-h-screen bg-black text-gray-100">
	<div class="flex justify-around">
		<a href="/" class="text-4xl text-center py-4"> Register </a>

		<h1 class="text-4xl text-center py-4" />
	</div>

	<form method="POST" class="max-w-md w-full mx-auto flex flex-col gap-3">
		<label for="username">Username</label>
		<input
			class="input"
			type="text"
			name="username"
			bind:value={$form.username}
			{...$constraints.username}
		/>
		{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		<label for="password">Password</label>
		<input
			class="input"
			type="password"
			name="password"
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

		<div><button class="btn variant-filled w-full">Login</button></div>
		{#if $page.status >= 400}
			<h3 class:invalid={$page.status >= 400}>Wrong Email or Password</h3>
		{/if}
	</form>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
