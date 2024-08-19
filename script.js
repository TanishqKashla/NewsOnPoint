fetch('/data.json')
    .then(response => response.json())
    .then(articles => {
        const container = document.getElementById('articles-container');
        container.innerHTML = ''; // Clear the container
        console.log("DATA IS FETCHED")

        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const title = document.createElement('h2');
            title.textContent = article.title;

            const img = document.createElement('img');
            img.src = article.imgSrc;
            img.alt = article.title;

            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank';

            articleDiv.appendChild(title);
            articleDiv.appendChild(img);
            articleDiv.appendChild(link);

            container.appendChild(articleDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));