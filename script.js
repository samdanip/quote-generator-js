const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loader
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Hide loader
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote() {
  loading();
  // Pick a random quote from quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   Check if author is null
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   Make font small for longer quotes
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    let response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //   Pick a random quote
    newQuote();
  } catch (error) {
    console.error(error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
