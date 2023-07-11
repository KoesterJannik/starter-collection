<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	/*<pre>
    {JSON.stringify(data.user, null, 2)}
</pre>*/
</script>

{#if form}
	{#if !form?.success}
		<p class="text-red-700">
			{form?.message}
		</p>
	{:else}
		<p class="text-green-700">
			{form?.message}
		</p>
	{/if}
{/if}
<div class="flex flex-wrap gap-4">
	{#each data.shopItems as item}
		<div class="flex flex-col items-center justify-center p-4 bg-white border-2 border-black">
			<img src={`/items/${item.item.image}`} alt={item.item.name} class="w-16 h-16" />
			<p>{item.item.name}</p>
			<p>{item.goldPrice} Gold</p>
			<p>{item.coinPrice} Coins</p>
			<p>
				STR: {item.item.bonusStrength}
			</p>
			<p>
				DEX: {item.item.bonusDexterity}
			</p>
			<p>
				INT: {item.item.bonusIntelligence}
			</p>
			<p>
				Life: {item.item.bonusLife}
			</p>

			{#if data.user.gold >= item.goldPrice}
				<form method="POST" action="?/buyItemWithGold">
					<input type="hidden" name="itemId" value={item.item.id} />
					<button type="submit" class="btn variant-filled">
						Buy for {item.goldPrice} Gold
					</button>
				</form>
			{/if}
			{#if data.user.coins >= item.coinPrice}
				<form method="POST" action="?/buyItemWithCoins">
					<input type="hidden" name="itemId" value={item.item.id} />
					<button type="submit" class="btn variant-filled">
						Buy for {item.coinPrice} Coins
					</button>
				</form>
			{/if}
		</div>
	{/each}
</div>
