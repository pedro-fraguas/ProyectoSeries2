window.onload = function() {

  //Esto carga los generos en el nav bar
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var generos = data.genres;
      var listado = document.querySelectorAll("ul.listado-generos li a");

      for (var i = 0; i < listado.length; i++) {
        listado[i].innerHTML = generos[i].name;
        listado[i].href = "SeriesPorGenero.html?idGenero=" + generos[i].id;
      }
    })

  //Esto carga las series populares al carrousel
  fetch("https://api.themoviedb.org/3/tv/popular?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".populares .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".populares .uk-slider-items li a");
      var titulos = document.querySelectorAll(".populares .uk-slider-items li");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        } else {
          titulos[i].innerHTML += "<div class=''><h1>" + series[i].name + "</h1></div>"
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })

  //Esto carga las series mejor puntuadas al carrousel
  fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".puntaje .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".puntaje .uk-slider-items li a");
      var titulos = document.querySelectorAll(".puntaje .uk-slider-items li");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        } else {
          titulos[i].innerHTML += "<div class='uk-position-center uk-panel'><h1>" + series[i].name + "</h1></div>";
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })

  //Esto carga las series al aire al carrousel
  fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".al-aire .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".al-aire .uk-slider-items li a");
      var titulos = document.querySelectorAll(".al-aire .uk-slider-items li");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        } else {
          titulos[i].innerHTML += "<div class='uk-position-center uk-panel'><h1>" + series[i].name + "</h1></div>";
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })

  //Esto revisa las condiciones para ejecutar la busqueda
  var buscador = document.querySelector("form.buscador");
  var input = document.querySelector("form.buscador input");
  buscador.onsubmit = function(event){
    if (input.value == "") {
      event.preventDefault();
    } else if (input.value.length < 3) {
      event.preventDefault();
      alert("Debe haber un minimo de 3 letras para buscar");
    }
  }

  //Esto muestra el buscador en el responsive
  var boton = document.querySelector("button.mostrar-buscador");
  boton.onclick = function() {
    document.querySelector("button.mostrar-buscador").style.display = "none";
    document.querySelector("form.buscador").style.display = "block";
    document.querySelector("div.ocultar").style.visibility = "hidden";
    document.querySelector("ul.esconder").style.visibility = "hidden";
  }

  var ventana = document.querySelector("main")
  ventana.onclick = function(){
    document.querySelector("button.mostrar-buscador").style.display = "inline-block";
    document.querySelector("form.buscador").style.display = "none";
    document.querySelector("div.ocultar").style.visibility = "visible";
    document.querySelector("ul.esconder").style.visibility = "visible";
  }



}
