import { browser } from "protractor";
const { By } = require("selenium-webdriver");
const  testdata = require('./../../../testData.json')

describe('TODO', () => {
    const URL = "http://tutorialsninja.com/demo/";

    it('should go to tutorialsninja.com/demo/ and login', async() => {
        browser.waitForAngularEnabled(false);
        browser.get(URL);
        expect(browser.getCurrentUrl()).toContain(URL);
        await browser.findElement(By.xpath('//span[text()="My Account"]')).click();
        await browser.findElement(By.xpath('//*[text()="Login"]')).click();
        await browser.findElement(By.css('#input-email')).sendKeys(testdata.email);
        await browser.findElement(By.css('#input-password')).sendKeys(testdata.password);
        await browser.findElement(By.css('[type="submit"]')).click();
        const myAccountElement = await browser.findElement(By.xpath('//*[@id="content"]//h2'));
        expect(myAccountElement.getText()).toEqual('My Account');
    });

    it('should test Phones & PDAs sort price high to low', async() => {
        await browser.findElement(By.xpath('//a[text()="Phones & PDAs"]')).click();
        await browser.findElement(By.css('#list-view')).click();
        browser.get(await browser.findElement(By.xpath('//option[text()="Price (High > Low)"]')).getAttribute('value'))
        const items = await browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice =  await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length +'] //p[@class="price"]')).getText();
        expect(priceToNum(lastItemPrice)).toBeLessThan(+priceToNum(firstItemPrice));
    });

    it('should test Phones & PDAs sort price Low to high', async() => {
        await browser.findElement(By.xpath('//a[text()="Phones & PDAs"]')).click();
        await browser.findElement(By.css('#list-view')).click();
        browser.get(await browser.findElement(By.xpath('//option[text()="Price (Low > High)"]')).getAttribute('value'))
        const items = await browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice =  await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length +'] //p[@class="price"]')).getText();
        expect(priceToNum(firstItemPrice)).toBeLessThan(+priceToNum(lastItemPrice));
    });

    it('should place order for Palm Treo Pro', async() =>{
        await browser.findElement(By.xpath('//a[text()="Palm Treo Pro"]')).click();
        await browser.findElement(By.css('#button-cart')).click();
        await (await browser.findElement(By.css('#cart-total'))).click();
        await (await browser.findElement(By.xpath('//*[text()=" Checkout"]'))).click();
        await browser.sleep(5000)
    });
});

const priceToNum = (price) => {
    return +price.split("\n")[0].match(/\d.+/g,"")
}
