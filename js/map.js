window.addEventListener('load', function() {
  var map;
  var marker;
  var infowindow;
  var image = '../assets/images/marker.png';
  var directionsDisplay, directionsService;
  var btn = document.getElementById('trazar');
  function initMap() {
    // Creamos un mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition(function(pos) {

      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, lon);

      var mapOptions = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: 'roadmap'
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Creamos el infowindow
      infowindow = new google.maps.InfoWindow();

      // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
      var request = {
        location: myLatlng,
        radius: 1000,
        name: ['bbva', 'continental']
      };

      // Creamos el servicio PlaceService y enviamos la petición.
      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, function(results, status) {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            crearMarcador(results[i]);
          }
        }
      });
    });


    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -9.082632,
        lng: -84.0431127},
      zoom: 4
    });


    // Autocomplete
    var inputStarting = document.getElementById('inputOrigin');
    console.log(inputStarting);
    var inputDestination = document.getElementById('inputDestination');
    console.log(inputDestination);
    new google.maps.places.Autocomplete(inputStarting);
    new google.maps.places.Autocomplete(inputDestination);

    // Description of route
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    // evento click

    // Description of route
    function calcRoute(directionsService, directionsDisplay) {
      var request = {
        origin: inputStarting.value,
        destination: inputDestination.value,
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(response, status) {
        console.log(response);
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }
      });
      directionsDisplay.setMap(map);
      marker.setMap(null);
    };

    btn.addEventListener('click', function(event) {
      event.preventDefault();
      calcRoute(directionsService, directionsDisplay);
    });
  }

  function crearMarcador(place) {
    // Creamos un marcador
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: image
    });

    // Asignamos el evento click del marcador
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Dirección: ' + place.vicinity + '</div><br><button class="ruta" type="button">Cómo llegar aqui?</button>');
      infowindow.open(map, this);
      // var ruta= $('.ruta');
      $('.ruta').on('click', function() {
        console.log('trazando');
      });
    });
  }


  initMap();
});
