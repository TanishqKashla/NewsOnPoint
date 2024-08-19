import puppeteer from "puppeteer";

const ndtv = async () => {

    const url = "https://www.ndtv.com/latest";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.waitForSelector(".news_Itm:not(.adBg)");

    const allArticles = await page.evaluate(() => {

        const articles = document.querySelectorAll(".news_Itm:not(.adBg)");

        return Array.from(articles).slice(0, 5).map(article => {

            const titleElement = article.querySelector('.news_Itm-cont > .newsHdng');
            const title = titleElement ? titleElement.innerText : 'No title';

            // Get image URL
            const imgElement = article.querySelector('.news_Itm-img > a > img');
            const imgSrc = imgElement
                ? imgElement.getAttribute('data-src') || imgElement.getAttribute('data-lazy') || imgElement.src
                : 'No image';

            // Get article URL
            const linkElement = article.querySelector('.news_Itm-img > a');
            const url = linkElement ? linkElement.href : 'No URL';

            return { title, imgSrc, url };
        });
    });

    await browser.close();
    // console.log(allArticles)
    return allArticles;
}

export { ndtv }