/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Item, ItemType, Race } from '@prisma/client';
import { prisma } from '../src/lib/$server/db';

async function seedQuests() {
	const quests = [
		{
			title: 'Introduction',
			description:
				'Hey there! Welcome to the game.Go ahead and do your first fight. I will reward you',
			requiredQuestLevel: 1,
			questExp: 250,
			questGold: 80,
			uniqueChecker: 'QUEST_ONE',
			image: 'quest01.png'
		},
		{
			title: 'Reach level 2',
			description: 'Reach level 2 and earn money.',
			requiredQuestLevel: 2,
			questExp: 250,
			questGold: 300,
			uniqueChecker: 'QUEST_TWO',
			image: 'quest02.png'
		},
		{
			title: 'Money saver',
			description: 'Save up to 500 Gold.',
			requiredQuestLevel: 3,
			questExp: 250,
			questGold: 500,
			uniqueChecker: 'QUEST_THREE',
			image: 'quest02.png'
		}
	];

	for (const quest of quests) {
		const questExist = await prisma.quest.findUnique({
			where: {
				uniqueChecker: quest.uniqueChecker
			}
		});
		if (!questExist) {
			console.log(`Creating quest ${quest.title}`);
			await prisma.quest.create({
				data: {
					title: quest.title,
					description: quest.description,
					requiredQuestLevel: quest.requiredQuestLevel,
					questExp: quest.questExp,
					questGold: quest.questGold,
					uniqueChecker: quest.uniqueChecker,
					image: quest.image
				}
			});
		} else {
			console.log(`Updating quest ${quest.title}`);
			await prisma.quest.update({
				where: {
					uniqueChecker: quest.uniqueChecker
				},
				data: {
					title: quest.title,
					description: quest.description,
					requiredQuestLevel: quest.requiredQuestLevel,
					questExp: quest.questExp,
					questGold: quest.questGold,
					uniqueChecker: quest.uniqueChecker,
					image: quest.image
				}
			});
		}
	}
}

async function createItems() {
	const items = [
		// Level 1 Stuff
		{
			allowedRaces: ['Roque', 'Warrior'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'WEAPON' as ItemType,
			name: 'Beginner Sword',
			description: 'A sword for beginners',
			image: 'sword.png'
		},
		{
			allowedRaces: ['Sorcerer', 'Warrior'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'WEAPON' as ItemType,
			name: 'Beginner Staff',
			description: 'A beginner staff for Sorcerers',
			image: 'sword.png'
		},
		{
			allowedRaces: ['Roque', 'Warrior', 'Sorcerer'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'HELMET' as ItemType,
			name: 'Beginner Helmet',
			description: 'A Helmet for beginners',
			image: 'sword.png'
		},
		{
			allowedRaces: ['Roque', 'Warrior', 'Sorcerer'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'SHOULDER' as ItemType,
			name: 'Beginner Shoulders',
			description: 'A shoulder for beginners',
			image: 'sword.png'
		},
		{
			allowedRaces: ['Roque', 'Warrior', 'Sorcerer'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'GLOVE' as ItemType,
			name: 'Beginner Gloves',
			description: 'A Gloves for beginners',
			image: 'sword.png'
		},
		{
			allowedRaces: ['Roque', 'Warrior'] as Race[],
			requiredLevel: 1,
			bonusDexterity: 1,
			bonusStrength: 1,
			bonusIntelligence: 1,
			bonusLife: 1,
			itemType: 'ARMOR' as ItemType,
			name: 'Beginner Armor',
			description: 'A armor for beginners',
			image: 'sword.png'
		}
	];

	for (const item of items) {
		const itemExist = await prisma.item.findUnique({
			where: {
				name: item.name
			}
		});
		if (!itemExist) {
			console.log(`Creating item ${item.name}`);
			await prisma.item.create({
				data: {
					allowedRaces: item.allowedRaces,
					requiredLevel: item.requiredLevel,
					bonusDexterity: item.bonusDexterity,
					bonusStrength: item.bonusStrength,
					bonusIntelligence: item.bonusIntelligence,
					bonusLife: item.bonusLife,
					itemType: item.itemType,
					name: item.name,
					description: item.description,
					image: item.image
				}
			});
		} else {
			console.log(`Updating item ${item.name}`);
			await prisma.item.update({
				where: {
					name: item.name
				},
				data: {
					allowedRaces: item.allowedRaces,
					requiredLevel: item.requiredLevel,
					bonusDexterity: item.bonusDexterity,
					bonusStrength: item.bonusStrength,
					bonusIntelligence: item.bonusIntelligence,
					bonusLife: item.bonusLife,
					itemType: item.itemType,
					name: item.name,
					description: item.description,
					image: item.image
				}
			});
		}
	}
}

async function createShop() {
	const shopItems = [
		{
			itemName: 'Beginner Sword',
			requiredLevel: 1,
			goldPrice: 100,
			coinPrice: 50,
			quantity: 1
		},
		{
			itemName: 'Beginner Staff',
			requiredLevel: 1,
			goldPrice: 100,
			coinPrice: 50,
			quantity: 1
		},
		{
			itemName: 'Beginner Helmet',
			requiredLevel: 1,
			goldPrice: 100,
			coinPrice: 50,
			quantity: 1
		}
	];

	for (const shopItem of shopItems) {
		const item = await prisma.item.findUnique({
			where: {
				name: shopItem.itemName
			}
		});
		if (item) {
			const itemExist = await prisma.shopItem.findUnique({
				where: {
					itemId: item.id
				}
			});
			if (!itemExist) {
				console.log(`Creating shop item ${item.name}`);
				await prisma.shopItem.create({
					data: {
						itemId: item.id,
						requiredLevel: shopItem.requiredLevel,
						goldPrice: shopItem.goldPrice,
						coinPrice: shopItem.coinPrice,
						quantity: shopItem.quantity
					}
				});
			}
		}
	}
}

await seedQuests();
console.log('Quests seeded');
console.log('Creating items');
await createItems();
console.log('Items created');
console.log('Creating shop');
await createShop();
/*const user = await prisma.user.findUnique({
	where: {
		username: 'bratan'
	}
});
const randomItem = await prisma.item.findFirst({});
const newUserItem = await prisma.userItem.create({
	data: {
		itemId: randomItem!.id,
		userId: user!.id,
		equipped: false,
		possibleFirstBonusStrength: 0,
		possibleSecondBonusIntelligence: 0,
		possibleThirdBonusDexterity: 0,
		possibleFourthBonusLife: 0
	}
});

const allItemsFromUser = await prisma.userItem.findMany({
	where: {
		userId: user!.id
	},
	include: {
		item: true
	}
});
console.log(JSON.stringify(allItemsFromUser, null, 2));*/
