window.onload = function() {

  //Esto recupera la info de las series favoritas guardadas

  var recuperoStorage = localStorage.getItem("seriesFavoritas");

  if (recuperoStorage == null) {
    seriesFavoritas = [];
  } else {
    seriesFavoritas = JSON.parse(recuperoStorage);
  }

  for (var i = 0; i < seriesFavoritas.length; i++) {
    fetch("https://api.themoviedb.org/3/tv/" + seriesFavoritas[i] + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.poster_path != null) {
          document.querySelector("section.series").innerHTML += "<article class='serie-favorita'><a href='DetalleDeSerie.html?idSerie=" + data.id + "'><img src='https://image.tmdb.org/t/p/original" + data.poster_path + "' alt=''></a></article>"
        } else {
          document.querySelector("section.series").innerHTML += "<article class='serie-favorita'><a href='DetalleDeSerie.html?idSerie=" + data.id + "'><img src='../img/poster-default.png' alt=''></a></article>"
        }
      })
  }

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
