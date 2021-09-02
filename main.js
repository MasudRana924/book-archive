const spinner = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
}
const searchResult = displaySearchToggle => {
    document.getElementById('display-search').style.display = displaySearchToggle;
}
const searchBook = () => {
    const input = document.getElementById('search-input')
    const inputText = input.value
    input.value = ''

    spinner('block')
    searchResult('none')
    document.getElementById('total-search').style.display = ('none')
    const noResultFound = document.getElementById('no-result')
    noResultFound.innerHTML = ''
    if (inputText === '') {
        // console.log(alert('enter a valid input'))

        spinner('none')
        const div = document.createElement('div')
        div.innerHTML = `<div class="alert alert-danger text-center" role="alert">
                    Sorry No Result Found !!!
                          </div>`
   noResultFound.appendChild(div)
}
    else {
        const url = `https://openlibrary.org/search.json?q=${inputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                let totalSearch = data.numFound
                document.getElementById('total-search').innerHTML = `
                <div class="alert alert-success text-center" role="alert">
                Total Search Result Found : ${totalSearch}
                          </div>`

                displaySearch(data.docs)
            })
    }
}
const displaySearch = books => {
    const displayResult = document.getElementById('display-search')
    displayResult.textContent = ''
    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col-md-3')
        div.innerHTML = `<div class="card  ">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-300" alt="">
                         <div class="card-body bg-info text-white>
                             <h5  class="card-title"><span class="text-dark">Title :  ${book.title}</span></h5>
                             <p> Author :  ${book.author_name? book.author_name:'Dont Found'}</p>
                             <small>  Publisher :  ${book.publisher? book.publisher:'Dont Found'}</small>
                             </br>
                            <small>First Published  : ${book.first_publish_year? book.first_publish_year:'Dont Found'}</small>
                </div>
      </div>`
        displayResult.appendChild(div)
    })
    spinner('none')
    document.getElementById('total-search').style.display = ('block')
    searchResult('flex')
}
