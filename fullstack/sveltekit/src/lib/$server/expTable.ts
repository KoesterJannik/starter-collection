import type { User } from '@prisma/client';
import { prisma } from './db';

export const EXP_TABLE = [
	{ level: 1, exp: 0 },
	{ level: 2, exp: 100 },
	{ level: 3, exp: 150 },
	{ level: 4, exp: 225 },
	{ level: 5, exp: 338 },
	{ level: 6, exp: 507 },
	{ level: 7, exp: 760 },
	{ level: 8, exp: 1140 },
	{ level: 9, exp: 1710 },
	{ level: 10, exp: 2565 },
	{ level: 11, exp: 3848 },
	{ level: 12, exp: 5772 },
	{ level: 13, exp: 8658 },
	{ level: 14, exp: 12987 },
	{ level: 15, exp: 19480 },
	{ level: 16, exp: 29220 },
	{ level: 17, exp: 43830 },
	{ level: 18, exp: 65745 },
	{ level: 19, exp: 98618 },
	{ level: 20, exp: 147927 },
	{ level: 21, exp: 221890 },
	{ level: 22, exp: 332835 },
	{ level: 23, exp: 499252 },
	{ level: 24, exp: 748878 },
	{ level: 25, exp: 1123317 },
	{ level: 26, exp: 1684976 },
	{ level: 27, exp: 2527464 },
	{ level: 28, exp: 3791196 },
	{ level: 29, exp: 5686794 },
	{ level: 30, exp: 8529891 },
	{ level: 31, exp: 12794837 },
	{ level: 32, exp: 19192256 },
	{ level: 33, exp: 28788384 },
	{ level: 34, exp: 43182576 },
	{ level: 35, exp: 64773864 },
	{ level: 36, exp: 97160797 },
	{ level: 37, exp: 145741196 },
	{ level: 38, exp: 218611794 },
	{ level: 39, exp: 327917691 },
	{ level: 40, exp: 491876537 },
	{ level: 41, exp: 737814806 },
	{ level: 42, exp: 1106722210 },
	{ level: 43, exp: 1660083315 },
	{ level: 44, exp: 2490124972 },
	{ level: 45, exp: 3735187459 },
	{ level: 46, exp: 5602781189 },
	{ level: 47, exp: 8404171784 },
	{ level: 48, exp: 12606257776 },
	{ level: 49, exp: 18909386665 },
	{ level: 50, exp: 28364079998 }
];

type CheckLevel = {
	usersLevel: number;
	usersExp: number;
};

export const getRequiredExpForNextLevel = (level: number): number => {
	const nextLevel = EXP_TABLE.find((x) => x.level === level + 1);
	if (!nextLevel) {
		return 0;
	}
	return nextLevel.exp;
};
export function checkForLevelUp(data: CheckLevel): boolean {
	const newPossibleUserLevel = data.usersLevel + 1;
	const neededExp = EXP_TABLE.find((x) => x.level === newPossibleUserLevel)?.exp;
	if (!neededExp) {
		return false;
	}
	return data.usersExp >= neededExp;
}

export async function setCorrectUserLevel(data: { userid: string; userExp: number }) {
	// NOTE. set new exp to user first and then call this function
	const { userid, userExp } = data;

	const user = await prisma.user.findUnique({
		where: {
			id: userid
		}
	});
	const currentUsersLevel = user!.level;
	let currentLevelToCheck = currentUsersLevel;
	let expForNextLevel = getRequiredExpForNextLevel(currentLevelToCheck);

	while (expForNextLevel <= userExp) {
		currentLevelToCheck++;
		expForNextLevel = getRequiredExpForNextLevel(currentLevelToCheck);
	}
	console.log(`User has enough exp to level up to level ${currentLevelToCheck}`);
	await prisma.user.update({
		where: {
			id: userid
		},
		data: {
			level: currentLevelToCheck
		}
	});
}

type CheckQuest = {
	user: User;
	uniqueChecker: string;
};
export const checkForCompletion = (data: CheckQuest) => {
	switch (data.uniqueChecker) {
		case 'QUEST_ONE': {
			const totalNpcFights = data.user.wonNpcFights + data.user.lostNpcFights;
			return {
				questDone: totalNpcFights >= 1,
				missingMessage: 'You need to fight at least 1 NPC to complete this quest'
			};
		}
		case 'QUEST_TWO': {
			return {
				questDone: data.user.level >= 2,
				missingMessage: 'You need to be at least level 2 to complete this quest'
			};
		}
		case 'QUEST_THREE': {
			return {
				questDone: data.user.gold >= 500,
				missingMessage: 'You do not have 500 gold in your inventory to complete this quest'
			};
		}

		default:
			return {
				questDone: false,
				missingMessage: 'This quest does not exist for Completion'
			};
	}
};
