window.onload(function(){
    //Esto carga los generos al nav bar
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var generos = data.genres;
        var listado = document.querySelectorAll("ul.listado-generos li a");

        for (var i = 0; i < listado.length; i++) {
        listado[i].innerHTML = generos[i].name;
        listado[i].href = "/series/by-genre/" + generos[i].id;
        }
    })
})