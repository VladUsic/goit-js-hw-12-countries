'use strict';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';


export default function fetchCountries(query) {
    if (query) {
        return fetch(baseUrl + requestParams).then(response => {
                if (response.ok) return response.json();
                throw new Error('Error fetching data');
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}