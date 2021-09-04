'use strict';
import serviceFetchCountries from '../services/fetchCountries.js'
import countryList from '../templates/countrysList.hbs'
import oneCountryInfo from '../templates/ifOneCountry.hbs'

import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css'
PNotify.defaults.delay = 4000;

import debounce from '../../node_modules/lodash'

const refs = {
    input: document.querySelector('#js-input'),
    listCountry: document.querySelector('.js-list'),
}

refs.input.addEventListener('input', _.debounce(createListCountryHandler, 500));

function createListCountryHandler(e) {

    clearListItems()
    const searchQuery = e.target.value.trim();
    serviceFetchCountries.fetchCountries(searchQuery)
        .then(data => {
            data.trim();
            if (data.length > 10) {
                PNotify.error({
                    text: "Too many matches found. Please enter a more specific query!"
                });
            } // else if (data.status === 404) {
            //  PNotify.error({
            //    text: "No country has been found. Please enter a more specific query!"
            //    });
            // }
            else if (data.length === 1) {
                buildListMarkup(data, oneCountryInfo);
            } else if (data.length <= 10) {
                buildListMarkup(data, countryList);
            }
        })
        .catch(error => {
            PNotify.error({
                text: "You must enter query parameters!"
            });
            console.log(error)
        })
}

function buildListMarkup(countrys, template) {
    const markup = countrys.map(count => template(count)).join();
    refs.listCountry.insertAdjacentHTML('afterbegin', markup)
}

function clearListItems() {
    refs.listCountry.innerHTML = '';
}