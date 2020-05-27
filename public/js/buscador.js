window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");
  var series;
  var imagenes;
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

  //Esto carga la primer tanda de resultados
  fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query=" + loBuscado + "&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      totalDeSeries = data.total_results;
      series = data.results;
      document.querySelector("h1").innerHTML = "Esto encontramos para tu busqueda de '" + loBuscado + "':"
      cargarSeries(series);
      if (imagenes.length >= totalDeSeries) {
        verMas.style.visibility = "hidden";
      }
      var input = document.querySelector("form.buscador input");
      input.value = loBuscado;
    })

  function cargarSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");
    var titulos = document.querySelectorAll("article.serieBuscada");

    for (var i = 0; i < series.length; i++) {
      if (series[i].poster_path != null) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      } else {
        titulos[i].innerHTML += "<div class='titulo-default'><h1>" + series[i].name + "</h1></div>";
      }
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
    for (var i = series.length; i < imagenes.length; i++) {
      imagenes[i].src = "";
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

    fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query=" + loBuscado + "&page=" + contador)
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
