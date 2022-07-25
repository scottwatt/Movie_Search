    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=573fd5a2`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })