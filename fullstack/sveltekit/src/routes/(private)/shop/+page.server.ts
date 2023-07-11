import { prisma } from '$lib/$server/db';
import { generateRandomNumberBetween } from '$lib/$server/monsters.js';
import { fail } from '@sveltejs/kit';
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	//@ts-ignore
	const user = event.locals.user;
	console.log(user.id);
	const allItemsForUserLevel = await prisma.shopItem.findMany({
		where: {
			// userlevel has to be higher or equal to the item level
			requiredLevel: {
				lte: user.level
			}
		},
		include: {
			item: true
		}
	});

	return {
		shopItems: allItemsForUserLevel
	};
};
export const actions = {
	buyItemWithGold: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const itemId = data.get('itemId');
		const user = await prisma.user.findUnique({
			where: {
				id: locals.user.id
			}
		});
		const itemToBuy = await prisma.shopItem.findUnique({
			where: {
				itemId: itemId as string
			},
			include: {
				item: true
			}
		});
		if (!itemToBuy) {
			return fail(400, {
				message: 'This item does not exist'
			});
		}
		if (!user) {
			return fail(400, {
				message: 'This user does not exist'
			});
		}
		if (user.gold < itemToBuy.goldPrice) {
			return fail(400, {
				message: 'You do not have enough gold to buy this item'
			});
		} else {
			//add the item to the user
			const updatedUser = await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					gold: user.gold - itemToBuy.goldPrice
				}
			});
			await prisma.userItem.create({
				data: {
					itemId: itemToBuy.itemId,
					equipped: false,
					possibleFirstBonusStrength: generateRandomNumberBetween(1, itemToBuy.requiredLevel),
					possibleThirdBonusDexterity: generateRandomNumberBetween(1, itemToBuy.requiredLevel),
					possibleSecondBonusIntelligence: generateRandomNumberBetween(1, itemToBuy.requiredLevel),
					userId: user.id
				}
			});
			return {
				success: true,
				message: `You bought ${itemToBuy.item.name} for ${itemToBuy.goldPrice} gold`
			};
		}
	}
};
