console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', jokeIn);
}

function jokeIn() {
    let whoseJoke = $('#whoseJokeIn').val();
    let jokeQuestion = $('#questionIn').val();
    let punchLine = $('#punchlineIn').val();
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