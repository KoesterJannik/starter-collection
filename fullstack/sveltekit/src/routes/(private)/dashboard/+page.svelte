<script lang="ts">
	import ProfileLayout from '../../../components/ProfileLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	/*<pre>
    {JSON.stringify(data.user, null, 2)}
</pre>*/
</script>

<ProfileLayout user={data.user} requiredExpForNextLevel={data.requiredExpForNextLevel} />

<pre>
	{JSON.stringify(data.items, null, 2)}
</pre>
