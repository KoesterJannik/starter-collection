<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class=" p-6">
	<ul class="flex gap-7 justify-center text-xl">
		<li
			class:active={$page.url.pathname.startsWith('/dashboard') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/dashboard') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/dashboard">Inventory</a
			>
		</li>
		<li
			class:active={$page.url.pathname.startsWith('/quest') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/quest') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/quest">Quest</a
			>
		</li>
		<li
			class:active={$page.url.pathname.startsWith('/hunt') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/hunt') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/hunt">Hunt</a
			>
		</li>
		<li
			class:active={$page.url.pathname.startsWith('/shop') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/shop') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/shop">Shop</a
			>
		</li>
		<li
			class:active={$page.url.pathname.startsWith('/guild') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/guild') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/guild">Guild</a
			>
		</li>
		<li
			class:active={$page.url.pathname.startsWith('/ranking') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/ranking') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/ranking">Ranking</a
			>
		</li>

		<li
			class:active={$page.url.pathname.startsWith('/patchnotes') ? 'active' : undefined}
			aria-current={$page.url.pathname.startsWith('/patchnotes') ? 'page' : undefined}
		>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/patchnotes">Patchnotes</a
			>
		</li>

		<li>
			<a
				class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				href="/logout">Logout</a
			>
		</li>
	</ul>
</nav>

<style>
	.active {
		color: brown;
	}
</style>
