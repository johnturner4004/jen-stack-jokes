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
    let joke = [{
        whoseJoke: whoseJoke,
        jokeQuestion: jokeQuestion,
        puhcnLine: punchLine
    }];
    console.log('jokeIn():', joke);
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}
