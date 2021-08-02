const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
	const text = generateText('Paulo', 22);

	expect(text).toBe('Paulo (22 years old)');
});

test('should output data-less text', () => {
	const text = generateText('', null);

	expect(text).toBe(' (null years old)');
});

test('should generaate a valid text output', () => {
	const text = checkAndGenerate('Paulo', 22);

	expect(text).toBe('Paulo (22 years old)');
});

test('should add a new user into the list', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
		args: ['--window-size=1080,720'],
	});

	const page = await browser.newPage();
	await page.goto('http://127.0.0.1:5500/index.html');

	await page.click('input#name');
	await page.type('input#name', 'Paulo');

	await page.click('input#age');
	await page.type('input#age', '22');

	await page.click('#btnAddUser');

	const finalText = await page.$eval('.user-item', (el) => el.textContent);

	expect(finalText).toBe('Paulo (22 years old)');
}, 10000);
