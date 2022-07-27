$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val)
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
    });
  });
  
  function getMovies(searchText){
   fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=99e26c0f`)
   .then(function(response){
    return response.json()
    
    .then(function(data){
    console.log(data);
    let movies = data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
        output += `
        <div class="row">
            <div class="col s12 m7>
                <div class="card">
                    <div class="card-image">
                        <img src="${movie.Poster}">
                        <span class="card-title>${movie.Title}</span>
                    </div>
                
                    <div class="card-action">
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>    
            </div>
        </div>
      `;
    });

    $('#movies').html(output);
    })
    })
    .catch(function(error){
        console.log(error);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

