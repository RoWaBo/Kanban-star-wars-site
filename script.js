
// ==== GLOBAL VARIABLES ====
const links = document.querySelectorAll(".collection-box__link");
// =============================

// ==== CLICK ON LINK UPDATES linkName ====
for (let index = 0; index < links.length; index++) {

    links[index].addEventListener("click", function () {
        let linkName = this.innerHTML;
        window.sessionStorage.setItem("linkNameKey", linkName); //linkName is being saved in browser storage
    });
};

// ==== ADD LINK NAME TO URL ==== //OBS jeg endte med ikke at aflæse URL'en og brugte bare linkName istedet! 
addLinkNameToURL();
function addLinkNameToURL() {
    // preventing the function from running when not on intended page
    if (window.location.href.includes("character")) {

        let linkName = window.sessionStorage.getItem("linkNameKey"); // the sessionStorage saves value as long as browser is open. On browser shutdown value is lost.
        let urlHref = new URL(window.location.href); //The current page url
        let nextTitle = linkName; // the new browser title name. It's mostly ignored by browsers
        let nextState = { additionalInformation: 'Updated the URL with JS' };
        // Changeing the page url ('property name', value)
        urlHref.searchParams.set('characterName', linkName);
        // replacing page url without reloade (state, new title displayed in browser, the replacement url)
        window.history.replaceState(nextState, nextTitle, urlHref);

        fetchCharacterData(linkName);
    }
};
// =============================

// ==== FETCH CHARACTER DATA FROM SWAPI API ====
async function fetchCharacterData(linkName) {
    const response = await fetch('https://swapi.dev/api/people/?search=' + linkName);
    const result = await response.json();
    const characterData = result.results[0];
    console.log(characterData);
    addCharacterDataToHTML(characterData);
}
// ============================================

// ==== CHARACTER DATA IS BEING ADDED TO HTML ====
function addCharacterDataToHTML(characterData) {
    
    const characterDataArray = Object.entries(characterData);// converting characterData object to an array 
    // locating the HTML elements which are static
    const nameLocation = document.querySelector('.character__name');
    const subheadingLocation = document.querySelector('.character__subheading');
    const dataTableLocation = document.querySelector('.character__data-table');
    // updating HTML tags with text
    nameLocation.innerHTML = characterData.name;
    subheadingLocation.innerHTML = "Participates in " + characterData.films.length + " films";

    // loop which add data to table and creates as amny rows as specified by the index number
    for (let index = 1; index < 8; index++) {

        const [property, value] = characterDataArray[index];//Array deconstructing: selecting an array item and extracting the two values
        //Converting the value to a text node otherwise appendChild() doesn't work  
        const propertyNode = document.createTextNode(property);
        const valueNode = document.createTextNode(value);
        // Creating table elements and giving them classes
        const tableRow = document.createElement('tr');
        tableRow.classList.add('character__data-row');
        const tableHeader = document.createElement('th');
        tableHeader.classList.add('character__data-name');
        const tableData = document.createElement('td');
        tableData.classList.add('character__data-value');
        // Appendning HTML tags to be inside the table
        // propertyNode -> th -> tr -> table 
        tableHeader.appendChild(propertyNode);
        tableRow.appendChild(tableHeader);
        tableData.appendChild(valueNode);
        tableRow.appendChild(tableData);
        dataTableLocation.appendChild(tableRow);
    }
}
// =============================================== 