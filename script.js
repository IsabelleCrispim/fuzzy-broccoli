const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}
// Hide Loading 
function complete () {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;

    }
}
//Get Quote From API
async function getQuote () {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // if  Author is blank, add 'Unknow'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.lenght > 50) {
            quoteText.classList.add ('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote 
        complete();

    }catch (error) {
        // getQuote();
        console.log('whoops, no quote',error);
    }
    // tweer Quote 
function tweetQuote () {
    const quote = quoteText.innerText;
    const author= authorText.innerText;
    const twittweUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
    window.open(twittweUrl,'_blank');
}
// Event Listeners 
newQuoteBtn.addEventListener ('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);   
}

// ON Load
loading(); 
getQuote();