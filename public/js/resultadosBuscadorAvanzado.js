window.onload = function(){
  var datos = new URLSearchParams(location.search)
  var generoincluido = datos.get("generoincluido")
  var generoexcluido = datos.get("generoexcluido")
  var año = datos.get("añoestreno")
  var mostrar = datos.get("ordenresultados")
  var series;
  var imagenes;
  var contador = 1;
  var totalDeSeries;


// Condicieones de rellenado de campos

  if (generoincluido == null && generoexcluido == null && año == "" && mostrar == null) {
    alert("Se debe completar al menos un campo");
    location.href = "../html/BuscadorAvanzado.html";
  } else if (generoincluido != null && generoexcluido != null) {
    alert("Podes incluir una serie o excluir una, no podes hacer ambas!")
    location.href = "../html/BuscadorAvanzado.html";
  }

// Genera variables para completar el href
  if (generoincluido != null) {
    generoincluido = "&with_genres=" + generoincluido;
  } else {
    generoincluido = "";
  }
  if (generoexcluido != null) {
    generoexcluido = "&without_genres=" + generoexcluido;
  } else {
    generoexcluido = "";
  }
  if (año != "") {
    año = "&first_air_date_year=" + año;
  }
  if (mostrar != null) {
    mostrar = "&sort_by=" + mostrar;
  } else {
    mostrar = "";
  }

  //Esto revisa las condiciones para ejecutar la busqueda del header
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

  //Esto carga la primer tanda de resultados

  fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US" + mostrar + año + "&page=1" + generoincluido + generoexcluido)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      totalDeSeries = data.total_results;
      series = data.results;
      cargarSeries(series);
      if (imagenes.length >= totalDeSeries) {
        verMas.style.visibility = "hidden";
      }
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

    fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US" + mostrar + año + "&page=" + contador + generoincluido + generoexcluido )
      .then(function(response){
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

  // Esto carga los generos al nav bar
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
