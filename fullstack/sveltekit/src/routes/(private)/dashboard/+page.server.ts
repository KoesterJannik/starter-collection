import { getRequiredExpForNextLevel } from '$lib/$server/expTable.js';
import { prisma } from '$lib/$server/db';
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	//@ts-ignore
	const user = event.locals.user;
	console.log(user.id);
	const requiredExpForNextLevel = getRequiredExpForNextLevel(user.level);
	const userItems = await prisma?.userItem.findMany({
		where: {
			userId: user.id
		},
		include: {
			item: true
		}
	});

	return {
		requiredExpForNextLevel,
		items: userItems
	};
};

export const actions = {
	default: async () => {
		return {};
	}
};
