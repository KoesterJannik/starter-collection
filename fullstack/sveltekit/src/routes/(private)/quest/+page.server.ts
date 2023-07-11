import { prisma } from '$lib/$server/db';
import { checkForCompletion, checkForLevelUp, setCorrectUserLevel } from '$lib/$server/expTable.js';
import { fail } from '@sveltejs/kit';
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	//@ts-ignore
	const user = event.locals.user;
	console.log(user.id);
	const allQuests = await prisma.quest.findMany({});

	return {
		allQuests
	};
};
export const actions = {
	finishQuest: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const questId = data.get('questId');
		// check if user already has quest done
		const user = await prisma.user.findUnique({
			where: {
				id: locals.user.id
			}
		});
		const questToFinish = await prisma.quest.findUnique({
			where: {
				id: questId as string
			}
		});
		if (!questToFinish) {
			return {};
		}
		if (!user) {
			return {};
		}

		if (user?.completedQuestUniques.includes(questToFinish?.uniqueChecker)) {
			return fail(400, {
				message: 'You already completed this quest'
			});
		} else if (user?.level < questToFinish.requiredQuestLevel) {
			return fail(400, {
				message: 'You are not high enough level to start this quest'
			});
		} else {
			const { questDone, missingMessage } = checkForCompletion({
				user: user,
				uniqueChecker: questToFinish.uniqueChecker
			});
			if (!questDone) {
				return fail(400, {
					success: questDone,
					message: missingMessage
				});
			}
			//add the quest to the user
			const updatedUser = await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					completedQuestUniques: {
						push: questToFinish.uniqueChecker
					},
					gold: user.gold + questToFinish.questGold,
					exp: user.exp + questToFinish.questExp
				}
			});

			await setCorrectUserLevel({
				userExp: updatedUser.exp,
				userid: updatedUser.id
			});

			return {
				success: true,
				message: `You completed the quest ${questToFinish.title} and earned ${questToFinish.questGold} gold and ${questToFinish.questExp} exp`
			};
		}
	}
};
