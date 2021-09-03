const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const foundResult = document.getElementById('found-result');

// functional search box
searchBtn.addEventListener('click', () => {
  const searchText = searchBox.value;
  
  // for clear search box
  searchBox.value= '';
  
    if(searchText === ''){
      foundResult.innerText = `Please enter any book name in search box for result`
    }
    else{ 
      fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then(data => searchItems(data))
    }
});

// functional search items
const searchItems = books =>{

  // how many books founded text
  if(books.numFound === 0){
    foundResult.innerHTML= `No result found.`;
  }
  else{
    foundResult.innerHTML = `Here ${books.docs.length} books are shown from ${books.numFound} books`;
  }

  // clear old searched books
  searchResult.textContent= '';

  // founded books
  books.docs.forEach( book =>{
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML= `
    <div class="card h-100">
      <img height="400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Book Image">
      <div class="card-body">
        <h5 class="card-title"><strong>Name:</strong> ${book.title}</h5>
        <h6 class="card-text"><strong>Author:</strong> ${book.author_name}</h6>
        <p class="card-text"><strong>Publisher:</strong> ${book.publisher}</p>
        <p class="card-text"><strong>First Publish:</strong> ${book.first_publish_year}</p>
      </div>
  </div>
    `;
    searchResult.appendChild(div)
  });
};
