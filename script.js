//get element search-input from html
//run everytime an input is passed in
document.getElementById('search-input').addEventListener('input', function() {
    const fullQuery = this.value; //stores the letters in box into query
    //if we have a value then get the closest values
    const query = fullQuery.trim(); //trim the empty spaces at the start and end of string
    if (query.length > 0) { 
        fetchSuggestions(query); //pass input
    }
    else {
        document.getElementById('suggestions').innerHTML = 'nothing';
    }
});

//sending post requests
function fetchSuggestions(query) {
    fetch('/plsWork', { //send request to app py
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        //send input in html box as a JSON string to app py on line 11
        body: JSON.stringify({ query: query }) 
    })

    //response
    .then(response => response.json()) //if the post works then display the suggestion
    .then(data => {showSuggestions(data.suggestions);}); //sends array of suggestions
}

function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; //clear previous response
    suggestions.forEach(suggestion => { //loop through suggestion in array
        const div = document.createElement('div'); //div from html division
        div.textContent = suggestion; // create individual suggestion
        div.addEventListener('click', function() { //fill in box with suggestion if we click it
            document.getElementById('search-input').value = suggestion;
            suggestionsContainer.innerHTML = ''; //clear 
        });
        suggestionsContainer.appendChild(div);
    });
}
