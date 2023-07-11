import { prisma } from '$lib/$server/db';

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	const allUsers = await prisma.user.findMany({
		select: {
			username: true,
			level: true,
			exp: true,
			strength: true,
			dexterity: true,
			intelligence: true,
			gold: true,
			race: true
		},
		orderBy: {
			level: 'desc'
		}
	});

	return {
		allUsers
	};
};
