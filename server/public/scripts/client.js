console.log('client.js sourced');

$( document ).ready( onReady );
//this will print a message to ensure jQuery is linked correctly this will also make
// the button to add jokes and the jokeIn function available for use when the page is
// loaded
function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', jokeIn);
    updateList();
}

//this will take user input from the DOM and use ajax to send it to server.js
//this will then clear the input fields so another joke can be added.
function jokeIn() {
    let whoseJoke = $('#whoseJokeIn').val();
    let jokeQuestion = $('#questionIn').val();
    let punchLine = $('#punchlineIn').val();
    if (jokeQuestion === '') {
        alert(`Please fill out all required fields`)
        return;
    }
    if (punchLine === '') {
        alert(`Please fill out all required fields`)
        return;
    }
    let joke = ({
        whoseJoke: whoseJoke,
        jokeQuestion: jokeQuestion,
        punchLine: punchLine
    });
    console.log('jokeIn():', joke);
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: joke
    })
    .then(function (response) {
        console.log('Response from server...', response);
        updateList();
    })
    .catch(function(error) {
        console.log('Error from server...', error);
        alert('Could not post jokes from the server');
    })
}

//this function retrieves the entire joke list from the server and sends it to the
//updateDisplay function
function updateList() {
    $.ajax({
        method: 'GET',
        url: '/jokes'
    })
    .then(function(response) {
        console.log('Get response from server...', response);
        updateDisplay(response);
    })
    .catch(function(error) {
        console.log('Get error from server...', error);
        alert('Could not get jokes from server');
    })
}

//this function will take an array of jokes and print them to the DOM
function updateDisplay(jokeList) {
    for(let i = 0; i < jokeList.length; i++) {
        $(outputDiv).append(`
        <p>Whose joke: ${jokeList[i].whoseJoke}</p>
        <p>Question: ${jokeList[i].jokeQuestion}</p>
        <p>Punch Line: ${jokeList[i].punchLine}</p>
        <p>&nbsp</p>
        `);
    }
    
}