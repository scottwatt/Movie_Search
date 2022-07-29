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
            <div class="col s4 m7 center-align>
                <div class="card">
                    <div class="card-image">
                        <img src="${movie.Poster}">
                        <span class="card-title>${movie.Title}</span>
                        <div class="card-action">
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
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

function movieDetail(){
    let movieId = sessionStorage.getItem('movieId');
    
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=99e26c0f`)
    .then(function(response){
      return response.json()
      
      .then(function(data){
        console.log(data);
        let movie = data;
        let output = `
        <div class="row">
        <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
              </div>
              </div>
              <div class="row">
              <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="https://www.youtube.com/watch?v=${response.video}" target="_blank" class="btn btn-primary">View Trailer</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
              </div>
              </div>
              `;
              console.log(response.video);
              $('#movie').html(output);
              sessionStorage.setItem('title', movie.Title);
              streaming()
            })
            .catch(function(error){
              console.log(error)
            });
            
          })
        }
        
        function streaming(){
          let title = sessionStorage.getItem('title');
          let movieId = sessionStorage.getItem('movieId')
          console.log(title);
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'd3d4c5f317mshee3f91b68ed1105p1081f6jsn6048356913dc',
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
          };
          
            

            // const options = {
            //   method: 'GET',
            //   headers: {
            //     'X-RapidAPI-Key': 'ab437ecc54msh017cc446f57b0c5p1b3250jsn88cc1e48f2e2',
            //     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            //   }
            // };
            
            fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${movieId}&output_language=en`, options)
              .then(response => response.json())
              .then(response => {

              console.log(response);
              let streaming = response.streamingInfo;
              let streamingName = '';
              let streamingLink = ''
              console.log(streaming);
              if(streaming.disney){
                streamingName = 'Disney Plus';
                streamingLink = streaming.disney.us.link;
                
              }else if(streaming.netflix){
                streamingName = 'Netflix';
                streamingLink = streaming.netflix.us.link;
               
              }else if(streaming.hulu){
                streamingName = 'Disney Plus';
                streamingLink = streaming.disney.us.link;
                
              }else if(streaming.hbo){
                streamingName = 'Hbo Max';
                streamingLink = streaming.hbo.us.link;
               
              }else if(streaming.peacock){
                streamingName = 'Peacock';
                streamingLink = streaming.peacock.us.link;
            
              }else if(streaming.starz){
                streamingName = 'Starz';
                streamingLink = streaming.starz.us.link;
                      
              }else if(streaming.showtime){
                streamingName = 'Showtime';
                streamingLink = streaming.showtime.us.link;
                
              }else if(streaming.apple){
                streamingName = 'Apple Tv';
                streamingLink = streaming.apple.us.link;
            }else{
                streamingName = 'Not on a streaming service';
    
                
            }        
            
            if(streamingLink !== ''){
            let output = `
            <div class="row">
              <div class="col-md-8">
                <h2>What streaming site?</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Stream site:</strong><a href = '${streamingLink}'>  ${streamingName}</a></li>
                </ul>
              </div>
            </div>
                
            `;
            
            $('#stream').html(output)
            }else {
              let output = `
            <div class="row">
              <div class="col-md-8">
                <h2>What streaming site?</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Stream site:</strong>  ${streamingName}</a></li>
                </ul>
              </div>
            </div>
                
            `;
            
            $('#stream').html(output)
          };
          sessionStorage.setItem('trailer', response.video)

            })
            
            .catch(err => console.error(err))
        }
