document.addEventListener("DOMContentLoaded", () => {
    const quoteList = document.getElementById("quote-list");
  
    // Fetch quotes from the server
    fetch("http://localhost:3000/quotes?_embed=likes")
      .then(response => response.json())
      .then(quotes => {
        // Populate quotes in the HTML
        quotes.forEach(quote => {
          const quoteCard = createQuoteCard(quote);
          quoteList.appendChild(quoteCard);
        });
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
      });
  
    // Function to create a quote card element
    function createQuoteCard(quote) {
      const li = document.createElement("li");
      li.className = "quote-card";
  
      const blockquote = document.createElement("blockquote");
      blockquote.className = "blockquote";
  
      const p = document.createElement("p");
      p.className = "mb-0";
      p.textContent = quote.quoteText;
  
      const footer = document.createElement("footer");
      footer.className = "blockquote-footer";
      footer.textContent = quote.author;
  
      const br = document.createElement("br");
  
      const likeButton = document.createElement("button");
      likeButton.className = "btn-success";
      likeButton.innerHTML = `
        Likes: <span>${quote.likes.length}</span>
        <span class="like-glyph">&hearts;</span>
      `;
  
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-danger";
      deleteButton.textContent = "Delete";
  
      // Event listener for like button
      likeButton.addEventListener("click", () => {
        mimicServerCall()
          .then(() => {
            // Increment the like count
            const likeCount = likeButton.querySelector("span");
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
  
            // Change heart icon to full
            likeButton.classList.add("liked");
          })
          .catch(error => {
            console.error("Error liking quote:", error);
          });
      });
  
      // Event listener for delete button
      deleteButton.addEventListener("click", () => {
        // Remove the quote from the UI
        li.remove();
  
        // Simulate deleting the quote from the server
        mimicServerCall()
          .then(() => {
            console.log("Quote deleted successfully");
          })
          .catch(error => {
            console.error("Error deleting quote:", error);
          });
      });
  
      blockquote.appendChild(p);
      blockquote.appendChild(footer);
      blockquote.appendChild(br);
      blockquote.appendChild(likeButton);
      blockquote.appendChild(deleteButton);
  
      li.appendChild(blockquote);
  
      return li;
    }
  
    // Function to simulate server call
    function mimicServerCall() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const randomNum = Math.random();
          if (randomNum < 0.5) {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    }
  });
  