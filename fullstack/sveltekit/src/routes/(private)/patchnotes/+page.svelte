<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	/*<pre>
    {JSON.stringify(data.user, null, 2)}
</pre>*/

	const patchnotes = [
		{
			date: '2023-07-07',
			changes: [
				'Added Mvp for Fighting',
				'Quests are now working. More to come',
				'Fixed a bug where the user skipped a level'
			]
		},
		{
			date: '2023-07-07',
			changes: ['Added Mvp for Fighting', 'Quests are now working. More to come']
		}
	];
</script>

<Accordion class="max-w-xl mx-auto bg-white">
	{#each patchnotes as patchnote, i}
		{#if i == 0}
			<AccordionItem open>
				<svelte:fragment slot="lead" />
				<svelte:fragment slot="summary">{patchnote.date}</svelte:fragment>
				<svelte:fragment slot="content">
					{#each patchnote.changes as change}
						<p>{change}</p>
					{/each}
				</svelte:fragment>
			</AccordionItem>
		{:else}
			<AccordionItem>
				<svelte:fragment slot="lead" />
				<svelte:fragment slot="summary">{patchnote.date}</svelte:fragment>
				<svelte:fragment slot="content">
					{#each patchnote.changes as change}
						<p>{change}</p>
					{/each}
				</svelte:fragment>
			</AccordionItem>
		{/if}
	{/each}
</Accordion>
