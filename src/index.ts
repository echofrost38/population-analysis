import "./index.scss";
import populationData from './data.json';

interface Country {
    name: string;
    men: number;
    women: number;
    youth: number;
}

interface Sums {
    men: number;
    women: number;
    youth: number;
}
function getProperty(obj: Sums, key: keyof Sums) {
    return obj[key];
}

document.addEventListener("DOMContentLoaded", function() {
    const countriesData = populationData.countries;
    const result = {};

    let totalCountsByCategory: Sums = {
        men: 0,
        women: 0,
        youth: 0
    };

    countriesData.forEach((country: Country) => {
        totalCountsByCategory.men += country.men;
        totalCountsByCategory.women += country.women;
        totalCountsByCategory.youth += country.youth;
    });

    const containerElement = document.getElementById('block-container');
    for(let category in totalCountsByCategory) {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        const blockTitleElement = document.createElement('div');
        blockTitleElement.classList.add('block-title');
        blockTitleElement.innerHTML = `
             <h5>${totalCountsByCategory[category as keyof Sums].toFixed(2)}M</h5>
             <span>${category.toUpperCase()}</span>
        `;
        blockElement.appendChild(blockTitleElement);

        const blockContentElement = document.createElement('div');
        blockContentElement.classList.add('block-content');

        const blockContentTitleElement = document.createElement('p');
        blockContentTitleElement.innerHTML='By country';
        blockContentElement.appendChild(blockContentTitleElement);

        const countryTagGridElement = document.createElement('div');
        countryTagGridElement.classList.add('country-tag-grid');
        countriesData.forEach((country: Country) => {
            const countryTagElement = document.createElement('div');
            countryTagElement.classList.add('country-tag', `category-${category}`);
            countryTagElement.innerHTML = `
                <div class="country-tag-pop">
                  <span>${country[category as keyof Sums].toFixed(2)}M</span>
                </div>
                <span class="country-tag-cname">${country.name}</span>
            `;
            countryTagGridElement.appendChild(countryTagElement);
        });
        blockContentElement.appendChild(countryTagGridElement);

        blockElement.appendChild(blockContentElement);

        containerElement.appendChild(blockElement)
    }
});