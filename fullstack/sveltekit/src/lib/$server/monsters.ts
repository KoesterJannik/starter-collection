import type { User } from '@prisma/client';
import { checkForLevelUp } from './expTable';
import { prisma } from '$lib/$server/db';
export const monsters = [
	'Gloomfang',
	'Shadowspike',
	'Doombringer',
	'Bloodthorn',
	'Nightshade',
	'Grimclaw',
	'Frostbite',
	'Venomfang',
	'Deathstrike',
	'Ironjaw',
	'Scorchwing',
	'Dreadscale',
	'Vilefang',
	'Doomhammer',
	'Blazefury',
	'Bonecrusher',
	'Voidreaper',
	'Soulrend',
	'Frostfire',
	'Darkheart',
	'Shadowstrike',
	'Cursedbeast',
	'Thunderhoof',
	'Nethermaw',
	'Venomspitter',
	'Blackthorn',
	'Hellfire',
	'Wraithwing',
	'Demonfang',
	'Nightstalker',
	'Chaosclaw',
	'Acidspine',
	'Razorwing',
	'Shadowscorn',
	'Necroscale',
	'Bloodseeker',
	'Thunderstrike',
	'Doomclaw',
	'Frostfang',
	'Venomshade',
	'Dreadclaw',
	'Skullcrusher',
	'Viperstrike',
	'Darkspire',
	'Ironhide',
	'Soulstealer',
	'Blazewalker',
	'Voidshadow',
	'Nightshriek',
	'Bonecleaver',
	'Hellscream',
	'Shadowwraith',
	'Dreadshade',
	'Frostbite',
	'Netherfang',
	'Doomfire',
	'Chaosmaw',
	'Rageclaw',
	'Venomspine',
	'Skullshadow',
	'Darkclaw',
	'Bloodhowl',
	'Thunderscale',
	'Doomscale',
	'Vileshade',
	'Soulspike',
	'Blackfire',
	'Nightbringer',
	'Frostshroud',
	'Ironfury',
	'Shadowbane',
	'Blazefang',
	'Voidstrike',
	'Dreadthorn',
	'Nighthowl',
	'Venomheart',
	'Deathstalker',
	'Thunderjaw',
	'Hellshadow',
	'Doomwhisper',
	'Frostwind',
	'Skullcrimson',
	'Viperscale',
	'Darkflame',
	'Soulreaper',
	'Blazeshadow',
	'Voidshriek',
	'Nightclaw',
	'Bloodstorm',
	'Thundertalon',
	'Doomhowl',
	'Vilefire',
	'Shadowfrost',
	'Netherstrike',
	'Dreadfire',
	'Frostclaw',
	'Venomshade',
	'Ironmaw',
	'Skullspike'
];

export const monsterImages = [
	'1.png',
	'2.png',
	'3.png',
	'4.png',
	'5.png',
	'6.png',
	'7.png',
	'8.png',
	'9.png',
	'10.png',
	'11.png',
	'12.png',
	'13.png',
	'14.png',
	'15.png',
	'16.png',
	'17.png',
	'18.png',
	'19.png',
	'20.png',
	'21.png',
	'22.png',
	'23.png',
	'24.png',
	'25.png',
	'26.png',
	'27.png',
	'28.png'
	/*'29.png',
	'30.png',
	'31.png',
	'32.png',
	'33.png',
	'34.png',
	'35.png',
	'36.png',
	'37.png',
	'38.png',
	'39.png',
	'40.png',
	'41.png',
	'42.png',
	'43.png',
	'44.png',
	'45.png',
	'46.png',
	'47.png',
	'48.png',
	'49.png',
	'50.png',
	'51.png',
	'52.png',
	'53.png',
	'54.png',
	'55.png',
	'56.png',
	'57.png',
	'58.png',
	'59.png',
	'60.png',
	'61.png',
	'62.png',
	'63.png',
	'64.png',
	'65.png',
	'66.png',
	'67.png',
	'68.png',
	'69.png',
	'70.png',
	'71.png',
	'72.png',
	'73.png',
	'74.png',
	'75.png',
	'76.png',
	'77.png',
	'78.png',
	'79.png',
	'80.png',
	'81.png',
	'82.png',
	'83.png',
	'84.png',
	'85.png',
	'86.png',
	'87.png',
	'88.png',
	'89.png',
	'90.png',
	'91.png',
	'92.png',
	'93.png',
	'94.png',
	'95.png',
	'96.png',
	'97.png',
	'98.png',
	'99.png',
	'100.png'*/
];

export const getRandomMonsterName = () => {
	return monsters[Math.floor(Math.random() * monsters.length)];
};

export const getRandomMonsterImage = () => {
	return monsterImages[Math.floor(Math.random() * monsterImages.length)];
};

type SimulationFight = {
	user: User;
	monsterName: string;
	monsterImage: string;
};

export type FightLogs = {
	msg: string;
	dealtPlayerDamage: number;
	dealtMonsterDamage: number;
};

type SimulationResults = {
	userWon: boolean;
	receivedExp: number;
	receivedGold: number;
	isLevelUp: boolean;
	fightLogs: FightLogs[];
	startMonsterHP: number;
};

export function generateRandomNumberBetween(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function simulateUserFight(data: SimulationFight): SimulationResults {
	let userWon = false;
	let receivedExp = 0;
	let receivedGold = 0;
	let isLevelUp = false;
	const fightLogs: FightLogs[] = [];

	let monsterHp = generateRandomNumberBetween(70, 80);
	const startMonsterHP = monsterHp;
	const randomMonsterStrength = generateRandomNumberBetween(
		data.user.strength - 5,
		data.user.strength + 2
	);
	const randomMonsterDexterity = generateRandomNumberBetween(
		data.user.dexterity - 5,
		data.user.dexterity + 2
	);
	const randomMonsterIntelligence = generateRandomNumberBetween(
		data.user.intelligence - 5,
		data.user.intelligence + 2
	);
	const monsterDamage = Math.floor(
		(randomMonsterStrength + randomMonsterDexterity + randomMonsterIntelligence) / 3
	);

	let userHp = data.user.life;
	const userDamage = Math.floor(
		(data.user.strength + data.user.dexterity + data.user.intelligence) / 3
	);

	while (userHp > 0 && monsterHp > 0) {
		//start fight, user attacks first
		monsterHp -= userDamage;
		fightLogs.push({
			msg: `You attacked ${data.monsterName} and dealt ${userDamage} damage`,
			dealtPlayerDamage: userDamage,
			dealtMonsterDamage: 0
		});

		if (monsterHp <= 0) {
			userWon = true;
			receivedExp = generateRandomNumberBetween(data.user.level + 5, data.user.level + 12);
			receivedGold = generateRandomNumberBetween(data.user.level + 5, data.user.level + 12);
			const userWentLevelUp = checkForLevelUp({
				usersLevel: data.user.level,
				usersExp: data.user.level + receivedExp
			});
			if (userWentLevelUp) {
				console.log('user went level up');
				isLevelUp = true;
			}
			break;
		} else if (userHp <= 0) {
			userWon = false;
			receivedExp = 0;
			receivedGold = 0;
			break;
		}

		userHp -= monsterDamage;
		fightLogs.push({
			msg: `${data.monsterName} attacked you and dealt ${monsterDamage} damage`,
			dealtPlayerDamage: 0,
			dealtMonsterDamage: monsterDamage
		});
		if (monsterHp <= 0) {
			userWon = true;
			receivedExp = generateRandomNumberBetween(data.user.level + 5, data.user.level + 12);
			receivedGold = generateRandomNumberBetween(data.user.level + 5, data.user.level + 12);
			const userWentLevelUp = checkForLevelUp({
				usersLevel: data.user.level,
				usersExp: data.user.level + receivedExp
			});
			if (userWentLevelUp) {
				console.log('user went level up');
				isLevelUp = true;
			}
			break;
		} else if (userHp <= 0) {
			userWon = false;
			receivedExp = 0;
			receivedGold = 0;
			break;
		}
	}
	console.log(fightLogs);

	return {
		userWon,
		receivedExp,
		receivedGold,
		isLevelUp,
		fightLogs,
		startMonsterHP
	};
}
