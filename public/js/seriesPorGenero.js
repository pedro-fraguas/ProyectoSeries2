window.onload = function(){
  var generoID = new URLSearchParams(location.search).get('idGenero');
  var series;
  var imagenes;
  var hipervinculos;
  var contador = 1;
  var totalDeSeries;

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
        listado[i].href = "SeriesPorGenero.html?idGenero=" + generos[i].id;
      }
    })

  //Esto carga el titulo del genero al h3
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      totalDeSeries = data.total_results;
      var listado = data.genres;
      for (var i = 0; i < listado.length; i++) {
        if (listado[i].id == generoID) {
          document.querySelector("h3.genero").innerHTML = listado[i].name;
          break;
        }
      }
    })

  //Esto carga los posters a los resultados
  fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=" + generoID + "&include_null_first_air_dates=false")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;
      cargarSeries(series);
    })

  function cargarSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    hipervinculos = document.querySelectorAll(".serieBuscada a");

    for (var i = 0; i < series.length; i++) {
      if (series[i].poster_path != null) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      }
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
  }

  //se puede hacer el scroll infinito con un evento .onscroll

  //Scroll infinito
  var verMas = document.querySelector("main button");
  verMas.onclick = function() {
    var resultados = document.querySelector("div.resultados");
    resultados.innerHTML += "<article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article>";
    contador++;
    cargarMasSeries(series);

    if (imagenes.length >= totalDeSeries) {
      verMas.style.visibility = "hidden";
    }
  }

  function cargarMasSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");
    var titulos = document.querySelectorAll(".serieBuscada");

    fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by=popularity.desc&page=" + contador + "&timezone=America%2FNew_York&with_genres=" + generoID + "&include_null_first_air_dates=false")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        series = data.results;
        for (var i = (contador - 1) * 20; i < (contador - 1) * 20 + series.length; i++) {
          if (series[i - (contador - 1) * 20].poster_path != null) {
            imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i - (contador - 1) * 20].poster_path;
          } else {
            titulos[i].innerHTML += "<div class='titulo-default'><h1>" + series[i - (contador - 1) * 20].name + "</h1></div>";
          }
          hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i - (contador - 1) * 20].id;
        }
        for (var i = (contador - 1) * 20 + series.length; i < imagenes.length; i++) {
          imagenes[i].src = "";
        }

      })
  }

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
