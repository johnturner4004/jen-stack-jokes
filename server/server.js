const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = 5000;

// use bodyParser.urlencoded throughout the app with thi–s:
app.use(bodyParser.urlencoded({ extended: true }));


//this is a starting array of jokes so there is something to initially load to the DOM
let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

//this function is used to add new jokes to the server
function addJoke(anotherJoke) {
  jokes.push({
    whoseJoke: anotherJoke.whoseJoke,
    jokeQuestion: anotherJoke.jokeQuestion,
    punchLine: anotherJoke.punchLine
  });
}

// this sets up a static server
app.use(express.static('server/public'));

//this accepts jokes from the client.js and sends them to addJoke();
app.post('/jokes', (req, res) => {
  let newJoke = req.body;
  addJoke(newJoke);
  console.log('Request for input...', newJoke);
  res.sendStatus(201);
})

// this gives the array back to client.js to be printed to the DOM
app.get('/jokes', (req, res) => {
  console.log('Request for output...', jokes);
  res.send(jokes);
})

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
