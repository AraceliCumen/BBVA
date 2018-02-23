$datePicker = $('#date-picker');
$datePicker.hide();

function begin() {
  $('.sidenav').sidenav();

  var $cards = $('.cards');
  var $containerCard = $('#container-card');
  var $information = $('#information');
  var $iconCalendar = $('#icon-calendar');

  var xhr = $.get('https://api.myjson.com/bins/qmxwd?pretty=1');

  $cards.on('click', function(e) {
    event.preventDefault(e);
    $information.html('');
    
    xhr.done(function(data) { 
      // console.log(data.DATA);
      $containerCard.html('');

      var dataCard = data.DATA;
      dataCard.forEach(element => {
        var numCta = element.NCUENTA;
        var tipoCta = element.TIPO_CTA;
        var typeCta = element.TYPE_CTA;
        var moves = element.MOVIMIENTOS; 

        // console.log(moves);

        $containerCard.append(`
        <div class="flex">
        <div class="col s3 m2">
            <img src="../assets/images/tarjeta.png" alt="tarjeta" class="bor-rad ">
          </div>
          <div class="col s5 m8">
            <p>${numCta}</p>
            <p>${tipoCta || typeCta}</p>
          </div>
          <div class="col s4">
            <a class="btn btn-primary col s12 button-card" data-cuenta="${numCta}" href="#">MOVIMIENTO</a>
          </div>
          </div>
        `);

        var informationCards = $('#container-card a');

        informationCards.on('click', function() {
          var cuenta = $(this).attr('data-cuenta');

          if (numCta === cuenta) {
            $information.html('');
            moves.forEach(element => {
              $information.prepend(`
              <div class="flex">
              <div class="col s4 m2 img-responsive">
              <img src="../assets/images/shop.svg" alt="shop">
              </div>
              <div class="col s5">
                <p>${element.EMPRESA}</p>
                <p>${element.FECHA}</p>
              </div>
              <div class="col s3">
                <p>${element.MONTO}</p>
                <p>NUEVOS ${element.MONEDA}</p>
              </div>
              </div>
              `);
            });
          }
        });
      });
    });
  });

  $iconCalendar.on('click', function() {
    $(this).hide();
    $datePicker.show();

    $datePicker.on('change', function() {
      $information.html('');

      xhr.done(function(data) {
        var dataCard = data.DATA;
        var date = $datePicker.val();
        var arrDate = date.split(' ', 3);
        
        arrMonths.forEach(element => {
          if (arrDate[1] === element) {
            if (arrDate[0].length === 1 && (arrMonths.indexOf(element) + 1).toString().length === '1'.length) {
              var dateMove = 0 + arrDate[0] + '-' + 0 + (arrMonths.indexOf(element) + 1) + '-' + arrDate[2];

            } else if (arrDate[0].length === 2 && (arrMonths.indexOf(element) + 1).toString().length === '1'.length) {
              var dateMove = arrDate[0] + '-' + 0 + (arrMonths.indexOf(element) + 1) + '-' + arrDate[2];

            } else if (arrDate[0].length === 1 && (arrMonths.indexOf(element) + 1).toString().length === '11'.length) {
              var dateMove = 0 + arrDate[0] + '-' + (arrMonths.indexOf(element) + 1) + '-' + arrDate[2];

            } else if (arrDate[0].length === 2 && (arrMonths.indexOf(element) + 1).toString().length === '11'.length) {
              var dateMove = arrDate[0] + '-' + (arrMonths.indexOf(element) + 1) + '-' + arrDate[2];

            }
          };
          
          dataCard.forEach(element => {
            // var numCta = element.NCUENTA;
            // var tipoCta = element.TIPO_CTA;
            // var typeCta = element.TYPE_CTA;
            var moves = element.MOVIMIENTOS; 
    
            // console.log(moves);
  
            moves.forEach(element => {
              var fecha = element.FECHA;
              // console.log(fecha);
              // console.log(date);

              if (fecha === dateMove) {
                $information.prepend(`
                <div class="flex">
                <div class="col s4 m2 img-responsive">
                <img src="../assets/images/shop.svg" alt="shop">
                </div>
                <div class="col s5">
                  <p>${element.EMPRESA}</p>
                  <p>${element.FECHA}</p>
                </div>
                <div class="col s3">
                  <p>${element.MONTO}</p>
                  <p>NUEVOS ${element.MONEDA}</p>
                </div>
                </div>
                  `);
              }
            });
          });
        });
      });
    });
  });

  /* Array de meses */
  var arrMonths = ['January,', 'February,', 'March,', 'April,', 'May,', 'June,', 'July,', 'August,', 'September,', 'October,', 'November,', 'December,'];

  /* Inicialización de la fecha */
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
}

$(document).ready(begin);