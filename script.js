const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// new quote
function newQuote() {
    showLoadingSpinner();
    // pull random quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check for blank author (null)
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    
    } else {
        authorText.textContent = quote.author;
    }
    // check for quote length for styling changes
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set the quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// grab quotes from an API
async function getQuotes() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

// Tweeting the quote
function tweetQuote() {
    const twitUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load in
getQuotes();
