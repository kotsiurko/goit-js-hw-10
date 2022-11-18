import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/countries-api';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 800;
const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countriesInfoEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));

// Input Handler Function
function onInputEnter(event) {
  const countryQuery = event.target.value.trim();
  if (countryQuery.length !== 0) {
    fetchCountries(countryQuery)
      .then(data => {
        renderData(data);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        // console.log(error);
      });
  }
}

// Function that renders data on HTML
function renderData(data) {
  // Render case for many countries
  if (data.length > 10) {
    clearRenderedData();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  // Render case for countries range below | console.log(data);
  if (data.length >= 2 && data.length <= 10) {
    const countryList = data.map(el => {
      return `
        <li>
          <img src="${el.flags.svg}" alt="${el.name.official} flag" width="30px"/>
          <h2>${el.name.official}</h2>
        </li>`;
    });
    clearRenderedData();
    countriesListEl.innerHTML = countryList.join('');
    return;
  }

  // ELSE Render case for exact one country | console.log(data[0]);
  const langs = Object.values(data[0].languages)
    .toString()
    .replaceAll(',', ', ');
  const countryInfo = `
    <div>
      <img src="${data[0].flags.svg}"
          alt="${data[0].name.official} flag"
          width="60px"/>
      <h2>${data[0].name.official}</h2>
    </div>
    <p><b>Capital:</b> ${data[0].capital}</p>
    <p><b>Population:</b> ${data[0].population}</p>
    <p><b>Languages:</b> ${langs}</p>
  `;
  clearRenderedData();
  countriesInfoEl.innerHTML = countryInfo;
}

// Function that clears HTML data
function clearRenderedData() {
  countriesListEl.innerHTML = '';
  countriesInfoEl.innerHTML = '';
}
