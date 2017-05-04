/*jshint esversion: 6 */

(() => {

    let submitButton = document.querySelector('#submit-button');
    submitButton.onclick = (e) => {
        e.preventDefault();
    };

    console.log('Witaj na stronie w konsoli!');

})();