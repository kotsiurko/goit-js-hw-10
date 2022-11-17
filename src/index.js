import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/countries-api';

const DEBOUNCE_DELAY = 800;
const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countriesInfoEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));
// ---------------

// ---------------

function onInputEnter(event) {
  const countryQuery = event.target.value.trim();
  if (countryQuery.length !== 0) {
    fetchCountries(countryQuery)
      .then(data => {
        renderData(data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(`Query country: ${countryQuery}`);
  }
}

function renderData(data) {
  // Case for many countries
  if (data.length > 10) {
    console.log(`Too many matches found. Please enter a more specific name.`);
    return;
  }

  // Case for countries range
  if (data.length > 2 && data.length < 10) {
    console.log(data);
    const newData = data.map(el => {
      return `${el.flags.svg} Country name: ${el.name.official}`;
    });
    console.log(newData);
    // console.log(`${data.flags.svg} Country name: ${data.name.official}`);
    return;
  }
  // Case for EXACT Country
  // console.log(data[0]);
  console.log(
    `${data[0].flags.svg}
    Country name: ${data[0].name.official}
    Capital: ${data[0].capital}
    Population: ${data[0].population}
    Languages: ${Object.values(data[0].languages)}`
  );
}
