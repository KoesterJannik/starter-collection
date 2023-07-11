import { json } from '@sveltejs/kit';
import { prisma } from '$lib/$server/db';
import { hashPassword, signToken } from '$lib/$server/auth/utils.js';
export async function POST({ request, cookies }) {
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

	const hashedPassword = await hashPassword(data.password);
	let race = '';
	let exp = 0;
	let gold = 0;
	let strength = 0;
	let dexterity = 0;
	let intelligence = 0;
	let baseLife = 0;
	switch (data.class) {
		case 'Roque':
			race = 'Roque';
			exp = 0;
			gold = 0;
			strength = 5;
			dexterity = 10;
			intelligence = 5;
			baseLife = 80;
			break;
		case 'Warrior':
			race = 'Warrior';
			exp = 0;
			gold = 0;
			strength = 10;
			dexterity = 10;
			intelligence = 5;
			baseLife = 120;
			break;
		case 'Sorcerer':
			race = 'Sorcerer';
			exp = 0;
			gold = 0;
			strength = 5;
			dexterity = 10;
			intelligence = 10;
			baseLife = 100;
			break;
		default:
			break;
	}

	const newUser = await prisma.user.create({
		data: {
			username: data.username,
			password: hashedPassword,
			dexterity: dexterity,
			strength: strength,
			intelligence: intelligence,
			gold: gold,
			exp: exp,
			race: race,
			life: baseLife,
			level: 1,
			coins: 0
		}
	});
	const token = await signToken({ id: newUser.id });
	// set it as a cookie
	cookies.set('token', token, {
		path: '/'
	});
	return json(
		{
			message: 'success'
		},
		{
			status: 200
		}
	);
}
