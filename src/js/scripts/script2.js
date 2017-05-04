/*jshint esversion: 6 */

(() => {

    let anchors = document.querySelectorAll('a');
    for(let a in anchors) {
        a.onclick = (e) => {
            e.preventDefault();
        };
    }

})();