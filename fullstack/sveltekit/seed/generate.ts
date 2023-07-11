const API_KEY = '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';
import { Configuration, OpenAIApi } from 'openai';
import http from 'https'; // or 'https' for https:// URLs
import fs from 'fs';

const configuration = new Configuration({
	apiKey: API_KEY
});

const openai = new OpenAIApi(configuration);
/*
const response = await openai.createImage({
	prompt: 'A cute baby sea otter',
	n: 1,
	size: '1024x1024'
});

const file = fs.createWriteStream('seed/test.png');
const request = http.get(response.data.data[0].url, function (response) {
	response.pipe(file);
	file.on('finish', () => {
		file.close();
		console.log('Download Done!');
	});
});*/

const response = await openai.createImageVariation(
	fs.createReadStream('test.png'),
	10,
	'1024x1024'
);
console.log(response);
let counter = 19;
for (const image of response.data.data) {
	const file = fs.createWriteStream(`seed/${counter}.png`);
	await http.get(image.url, function (response) {
		response.pipe(file);
		file.on('finish', () => {
			file.close();
			console.log('Download Done!');
		});
	});
	counter++;
}
