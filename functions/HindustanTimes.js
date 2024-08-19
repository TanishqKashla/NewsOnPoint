import puppeteer from "puppeteer";

const hindustantimes = async () => {

    const url = "https://www.hindustantimes.com/india-news";

    const browser = await puppeteer.launch({ headless: true }); // Chrome runs invisibly
    const page = await browser.newPage();

    // Wait until all network requests are done to ensure dynamic content is loaded
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for the articles to appear in the DOM
    await page.waitForSelector(".cartHolder");

    const allArticles = await page.evaluate(() => {
        // Select all articles
        const articles = document.querySelectorAll(".cartHolder");

        return Array.from(articles).slice(0, 5).map(article => {
            // Get title
            const titleElement = article.querySelector('.hdg3');
            const title = titleElement ? titleElement.innerText : 'No title';

            // Get image URL
            const imgElement = article.querySelector('figure > span > a > img.lazy') || article.querySelector('figure > span > a > img');
            const imgSrc = imgElement
                ? imgElement.getAttribute('data-src') || imgElement.getAttribute('data-lazy') || imgElement.src
                : 'No image';

            // Get article URL
            const linkElement = article.querySelector('figure > span > a');
            const url = linkElement ? linkElement.href : 'No URL';

            return { title, imgSrc, url };
        });
    });

    await browser.close();
    // console.log(allArticles)
    return allArticles;
}

export { hindustantimes }