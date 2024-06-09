// Dog breeds to show on the page
var breeds = ['shiba', 'schipperke', 'chihuahua', 'akita', 'husky'];

// Create a container div
var container = document.createElement('div');
container.className = 'container';

async function getDogImage(breed) {
    // Fetch information for breed from wikipedia.
    try {
        console.log("Try to get dog image URL for " + breed);

        const response = await fetch('https://dog.ceo/api/breed/' + breed + '/images/random');
        if (!response.ok) {
            throw new Error('HTTP error: ${response.status}');
        }

        const data = await response.json();
        const dogImageURL = data.message;
        return dogImageURL;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

async function getWikiInfo(breed) {
    // Fetch information for breed from wikipedia.
    try {
        console.log("Try to get wiki info for " + breed);

        const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + breed);
        if (!response.ok) {
            throw new Error('HTTP error: ${response.status}');
        }

        const data = await response.json();
        const breedWikiText = data.extract;
        return breedWikiText;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

// Build wiki item for breeds
breeds.forEach(async function(breed) {

    console.log("Build breed: " + breed);

    // Create wiki item div
    const wikiItem = document.createElement('div');
    wikiItem.className = 'wiki-item';

    // Create wiki header
    const wikiHeader = document.createElement('h1');
    wikiHeader.className = 'wiki-header';
    wikiHeader.textContent = breed.charAt(0).toUpperCase() + breed.slice(1); // Capitalize breed name

    // Create wiki content div
    const wikiContent = document.createElement('div');
    wikiContent.className = 'wiki-content';

    // Create wiki text
    const wikiText = document.createElement('p');
    wikiText.className = 'wiki-text';
    wikiText.textContent = await getWikiInfo(breed);

    // Create image container div
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    // Create wiki image
    const wikiImg = document.createElement('img');
    wikiImg.className = 'wiki-img';
    wikiImg.src = await getDogImage(breed); // Dog image URL from API

    // Append elements
    imgContainer.appendChild(wikiImg);
    wikiContent.appendChild(wikiText);
    wikiContent.appendChild(imgContainer);
    wikiItem.appendChild(wikiHeader);
    wikiItem.appendChild(wikiContent);
    container.appendChild(wikiItem);
});

// Append the container div to the body (or another specific element)
document.body.appendChild(container);
