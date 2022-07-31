   // first api key

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd3d4c5f317mshee3f91b68ed1105p1081f6jsn6048356913dc',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };

    // second api key 

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //         'X-RapidAPI-Key': 'ab437ecc54msh017cc446f57b0c5p1b3250jsn88cc1e48f2e2',
  //         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  //     }
  // };

// get the value of the form input 
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val)
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});


function getMovies(searchText) {
    fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=99e26c0f`)
        .then(function (response) {
            return response.json()

                .then(function (data) {
                    console.log(data);
                    let movies = data.Search;
                    let output = '';
                    
                    // loop through the movies in omdbapi and if there is a poster print it to #movies
                    $.each(movies, (index, movie) => {
                        if (movie.Poster !== 'N/A') {
                            output += `
                                    <div class="col s6 m4 13">
                                        <div class="box">
                                            <img src="${movie.Poster}">
                                            <div class="detail"> 
                                                <h5>${movie.Title}</h5>
                                                <p>${movie.Year}</p>
                                                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                            </div>
                                        </div>   
                                    </div>
                                    `;
                        }
                    });

                    $('#movies').html(output);
                })
        })
        .catch(function (error) {
            console.log(error);
        })
}

// set the id of the movie in session storage and set the new window to movie.html on an onclick event 
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

// sets streaming availability api as a global variable
var streamApi;

function movieDetail() {
    let movieId = sessionStorage.getItem('movieId');

    // gets movie details by using imdbID and applying them to html 
  
  // sets streamapi to fetch function 
  streamApi = fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${movieId}&output_language=en`, options)
      .then(response => response.json());

      streamApi.then(trailer => {

        fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=99e26c0f`)
          .then(function (response) {
              return response.json()
  
              .then(function (data) {
                      console.log(data);
                      let movie = data;
                      let output = `
                          <div class="row">
                          <div class="border">
                          <img src="${movie.Poster}" class="thumbnail">
                          </div>
                          <div class="column">
                          <h2>${movie.Title}</h2>
                          <h3>Plot</h3>
                          <div class="plot">${movie.Plot}</div>
                          <hr>
                          <ul class="list">
                          <li class="list-item"><strong class="bold">Genre:</strong> ${movie.Genre}</li>
                          <li class="list-item"><strong class="bold">Released:</strong> ${movie.Released}</li>
                          <li class="list-item"><strong class="bold">Rated:</strong> ${movie.Rated}</li>
                          <li class="list-item"><strong class="bold">IMDB Rating:</strong> ${movie.imdbRating}</li>
                          <li class="list-item"><strong class="bold">Director:</strong> ${movie.Director}</li>
                              <li class="list-item"><strong class="bold">Writer:</strong> ${movie.Writer}</li>
                              <li class="list-item"><strong class="bold">Actors:</strong> ${movie.Actors}</li>
                              </ul>
                              </div>
                              </div>
                              <div class="row">
                              <div class="well">
                              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                              <a href="http://youtube.com/watch?v=${trailer.video}" target="_blank" class="btn btn-primary">View Trailer</a>
                              <a href="index.html" class="btn btn-default">Home Page</a>
                              </div>
                              </div>
                              `;
  
                      $('#movie').html(output);
                  })
                  .catch(function (error) {
                      console.log(error)
                  });
  
          })
      })
      
    
    
}




function streaming() {
      streamApi
        .then(response => {

            console.log(response);
            let streaming = response.streamingInfo;
            let streamingName = '';
            let streamingLink = '';
            let logo = '';

            // if statement that assigns streaming info based on the api call 
            if (streaming.disney) {
                streamingName = 'Disney Plus';
                streamingLink = streaming.disney.us.link;
                logo = "./assets/images/disneypluslogo.jpeg";
                console.log(streaming);

            } else if (streaming.netflix) {
                streamingName = 'Netflix';
                streamingLink = streaming.netflix.us.link;
                logo = "./assets/images/netflixlogo.avif";

            } else if (streaming.hulu) {
                streamingName = 'Hulu';
                streamingLink = streaming.hulu.us.link;
                logo = "./assets/images/hululogo.png";

            } else if (streaming.hbo) {
                streamingName = 'Hbo Max';
                streamingLink = streaming.hbo.us.link;
                logo = "./assets/images/HBO_Max_Logo.png";

            } else if (streaming.peacock) {
                streamingName = 'Peacock';
                streamingLink = streaming.peacock.us.link;
                logo = "./assets/images/peacocklogo.png";

            } else if (streaming.starz) {
                streamingName = 'Starz';
                streamingLink = streaming.starz.us.link;
                logo = "./assets/images/starzlogo.png";

            } else if (streaming.showtime) {
                streamingName = 'Showtime';
                streamingLink = streaming.showtime.us.link;
                logo = "./assets/images/Showtime_logo.jpeg";

            } else if (streaming.apple) {
                streamingName = 'Apple Tv';
                streamingLink = streaming.apple.us.link;
                logo = "./assets/images/appletvlogo.png";

            } else {
                streamingName = 'Not on a streaming service.'
            }

            if (streamingLink !== '') {
                let output = `
            <div class="row">
              <div class="column">
                <h2>What streaming site?</h2>
                <ul class="list">
                  <li class="list logo"><strong class="bold">Stream site:</strong><a href = '${streamingLink}' target="_blank">  <img class='logoSize' src=${logo} alt='streaming logo'></a>${streamingName}</li>
                </ul>
              </div>
            </div>
                
            `;

                $('#stream').html(output)
            } else {
                let output = `
                <div class="row">
                  <div class="column">
                    <h2>What streaming site?</h2>
                    <ul class="list">
                      <li class="list-item"><strong> ${streamingName}</strong></li>
                    </ul>
                  </div>
                </div>
                    
                `;

                $('#stream').html(output)
            }
        })

        .catch(err => console.error(err))
}