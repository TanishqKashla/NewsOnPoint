// import puppeteer from "puppeteer";

// const toi = async () => {

//     const url = "https://timesofindia.indiatimes.com/news";

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'networkidle0' });

//     await page.waitForSelector(".HytnJ > li ");

//     const allArticles = await page.evaluate(() => {

//         const articles = document.querySelectorAll(".HytnJ > li");

//         return Array.from(articles).slice(0, 4).map(article => {

//             const titleElement = article.querySelector('.CRKrj');
//             const title = titleElement ? titleElement.innerText : 'No title';

//             // Get image URL
//             const imgElement = article.querySelector('.oo7Ma > img');
//             const imgSrc = imgElement
//                 ? imgElement.getAttribute('data-src') || imgElement.getAttribute('data-lazy') || imgElement.src
//                 : 'No image';

//             // Get article URL
//             const linkElement = article.querySelector('.VeCXM');
//             const url = linkElement ? linkElement.href : 'No URL';

//             return { title, imgSrc, url };
//         });
//     });

//     await browser.close();
//     return allArticles;
// }

// export { toi }

import puppeteer from "puppeteer";

const toi = async () => {
    const url = "https://timesofindia.indiatimes.com/news";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Intercept and block images and stylesheets
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector(".HytnJ > li", { timeout: 5000 });

    const allArticles = await page.evaluate(() => {
        const articles = document.querySelectorAll(".HytnJ > li");

        return Array.from(articles).slice(0, 5).map(article => {
            const titleElement = article.querySelector('.CRKrj');
            const title = titleElement ? titleElement.innerText : 'No title';

            // Get image URL
            const imgElement = article.querySelector('.oo7Ma > img');
            const imgSrc = imgElement
                ? imgElement.getAttribute('data-src') || imgElement.getAttribute('data-lazy') || imgElement.src
                : 'No image';

            // Get article URL
            const linkElement = article.querySelector('.VeCXM');
            const url = linkElement ? linkElement.href : 'No URL';

            return { title, imgSrc, url };
        });
    });

    await browser.close();
    // console.log(allArticles)
    return allArticles;
}

export { toi };
