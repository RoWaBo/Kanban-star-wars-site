
// ==== VARIABLES ====
const links = document.querySelectorAll(".collection-box__link");

let url = window.location.search;
 
let urlSearch = new URLSearchParams(url);

let Id = urlSearch.get("characterName");

// =============================

// ==== CLICK ON LINK UPDATES linkName ====
for (let index = 0; index < links.length; index++) {

    links[index].addEventListener("click", function (){
        let linkName = this.innerHTML;
        window.sessionStorage.setItem("linkNameKey", linkName); //linkName is being saved in browser storage
    }); 
};

// ==== ADD LINK NAME TO URL ====
addLinkNameToURL();
function addLinkNameToURL(){
    // preventing the function from running when not on intended page
    if (window.location.href.includes("character")){

        let linkName = window.sessionStorage.getItem("linkNameKey"); // the sessionStorage saves value as long as browser is open. On browser shutdown value is lost.
        let urlHref = new URL(window.location.href); //The current page url
        let nextTitle = linkName; // the new browser title name. It's mostly ignored by browsers
        let nextState = { additionalInformation: 'Updated the URL with JS' };
        // Changeing the page url ('property name', value)
        urlHref.searchParams.set('characterName', linkName); 
        // replacing page url without reloade (state, new title displayed in browser, the replacement url)
        window.history.replaceState( nextState, nextTitle, urlHref);    
    }     
};
// =============================
