import { json } from '@sveltejs/kit';
import { prisma } from '$lib/$server/db';
export async function POST({ request }) {
	const data = await request.json();
	console.log(data);
	const userInUse = await prisma.user.findUnique({
		where: {
			username: data.username
		}
	});
	if (userInUse) {
		return json(
			{ message: 'Username already in use' },
			{
				status: 400
			}
		);
	}
	return json(
		{ message: 'Hello World' },
		{
			status: 200
		}
	);
}
