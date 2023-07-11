import { prisma } from '$lib/$server/db';
import { checkForCompletion, checkForLevelUp, setCorrectUserLevel } from '$lib/$server/expTable.js';
import {
	getRandomMonsterImage,
	getRandomMonsterName,
	simulateUserFight
} from '$lib/$server/monsters.js';
import { fail } from '@sveltejs/kit';
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	//@ts-ignore
	const user = event.locals.user;
	console.log(user.id);
	const dbUser = await prisma.user.findUnique({
		where: {
			id: user.id
		}
	});
	const timeNow = new Date();
	const timeLastFight = new Date(dbUser?.lastFight || 0);

	const timeDifferenceInMinutes = (timeNow.getTime() - timeLastFight.getTime()) / 1000 / 60;
	console.log(`Timedifference in minutes: ${timeDifferenceInMinutes}`);
	if (timeDifferenceInMinutes < 0.5) {
		const timeInSecondsLeftToWait = Math.round(2 - timeDifferenceInMinutes) * 60;
		console.log('user has to wait');
		return {
			error: true,
			message: 'You can only fight once every 2 minutes',
			minutesLeftToWait: Math.round(2 - timeDifferenceInMinutes),
			timeInSecondsLeftToWait
		};
	}
	const randomMonsterName = getRandomMonsterName();
	const randomMonsterImage = getRandomMonsterImage();
	const { userWon, fightLogs, receivedExp, receivedGold, isLevelUp, startMonsterHP } =
		simulateUserFight({
			user,
			monsterImage: randomMonsterImage,
			monsterName: randomMonsterName
		});
	console.log(receivedExp, receivedGold);

	if (userWon) {
		console.log('user won');
		const updatedUser = await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				gold: user.gold + receivedGold,
				exp: user.exp + receivedExp,
				wonNpcFights: user.wonNpcFights + 1
			}
		});

		await setCorrectUserLevel({
			userExp: updatedUser.exp,
			userid: updatedUser.id
		});
	} else {
		console.log('user lost');
		const updatedUser = await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				lostNpcFights: user.lostNpcFights + 1
			}
		});
	}
	const lastFightTime = new Date();

	await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			lastFight: lastFightTime
		}
	});

	return {
		userWon,
		fightLogs,
		receivedExp,
		receivedGold,
		isLevelUp,
		randomMonsterImage,
		randomMonsterName,
		startMonsterHp: startMonsterHP
	};
};
