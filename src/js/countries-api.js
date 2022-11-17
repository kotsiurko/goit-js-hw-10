const BASE_URL = `https://restcountries.com/v3.1/name/`;

export const fetchCountries = countryQuery => {
  return fetch(
    // `${BASE_URL}${countryQuery}?fields=name.official,capital,currencies,population,flags.svg,languages`
    `${BASE_URL}${countryQuery}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
};

// https://restcountries.com/v2/all?fields=name,capital,currencies
// https://restcountries.com/v3.1/name/${countryQuery}
