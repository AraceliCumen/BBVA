var totalAcounts = $('.cant-acounts');
var numbersAcounts = $('.num-acounts');
var income = $('.income');
var consumption = $('.consumtion');
var month = $('#month');
var select = $('.select');
let url = 'https://alejandracp.github.io/BBVA-Json/data.json';

var proxy = 'https://cors-anywhere.herokuapp.com/';

$.ajax({
  url: proxy + url,
  contentType: 'application/json',
  method: 'GET',
  success: function(response) {
    getStatus(response);
    expensesMonths(response);
    // google.charts.load('current', { packages: ['corechart'] });
    // google.charts.setOnLoadCallback(drawChart);
    // google.charts.setOnLoadCallback(drawChart2);
  }
});

// Estadod de cuenta
function getStatus(data) {
  if (data.CODIGO_ESTADO === 200) {
    dataAccounts(data);
  }
}

var i = 0;
var consum = 0;
var j = 0;
// Muestra número de cuenta, saldo y suma de saldos.
function dataAccounts(data) {
  // console.log(data.DATA.LISTA_CTA);
  var cantAcounts = data.DATA.LISTA_CTA;
  var creditCount = data.DATA.LISTA_TARJ;
  totalAcounts.html(`Tienes ${cantAcounts.length} cuentas en BBVA`);
  $.each(cantAcounts, function(index, value) {
    numbersAcounts.append(`<p>${value.NCUENTA}</p>`);
    var num = parseFloat(value.SALDO.replace(',', ''));
    numbersAcounts.append(`<p>${num}</p>`);
    // Suma total de cuentas saldo
    i += num;
  });
  $.each(creditCount, function(index, value) {
    numbersAcounts.append(`<p>${value.NUMEROTARJETA}</p>`);
    var creditAble = parseFloat(value.CREDITODISPONIBLE.replace(',', ''));
    var creditLimit = parseFloat(value.LIMITECREDITO.replace(',', ''));
    consum = creditLimit - creditAble;
    numbersAcounts.append(`<p>${creditAble}</p>`);
  });
  income.append(`Su ingreso total es ${i.toFixed(2)}`);
  consumption.append(`Su egreso es de ${consum.toFixed(2)}`);
}

// function expensesMonths(data) {
//   var cantAcounts = data.DATA.LISTA_CTA;
//   // console.log(data.DATA.LISTA_CTA);
//   month.change(function() {
//     var monthSelected = $(this).val();
//     select.append(`<p>${$(this).val()}</p>`);
//     $.each(cantAcounts, function(index, value) {
//       var expenses = data.DATA.LISTA_CTA;
//       console.log(parseFloat(value.EGRESOS.MESES.ENERO));
//       console.log(monthSelected);
//       if (monthSelected === 'ENERO') {
//         j += parseFloat(value.EGRESOS.MESES.ENERO);
//         // console.log(i);
//       } else {
//         console.log('no es enero');
//       }
//     });
//     select.append(j);
//   });
// }
var enero = 0;febrero= 0;
function expensesMonths(data) {
  var cantAcounts = data.DATA.LISTA_CTA;
  // console.log(data.DATA.LISTA_CTA);
    $.each(cantAcounts, function(index, value) {
      var expenses = data.DATA.LISTA_CTA;
      console.log(parseFloat(value.EGRESOS.MESES.ENERO));
      enero += parseFloat(value.EGRESOS.MESES.ENERO);
      febrero += parseFloat(value.EGRESOS.MESES.FEBRERO);
    });
    // console.log(enero);
    // console.log(febrero);
}
// Google charts donuts

google.charts.load('current', { packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);
// google.charts.setOnLoadCallback(drawChart2);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "dg"],
    ["Ingreso", Number(i.toFixed(2))],
    ["Consumo", Number(consum.toFixed(2))]
  ]);
  var options = {
    title: 'My Daily Activities',
    // pieHole: 0.4,
    colors: ['#02428C', '#e7101e']
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('donut1')
  );
  chart.draw(data, options);
}

// google charts year

// function drawChart2() {
//   var data = new google.visualization.arrayToDataTable([
//     ['Mes', 'Consumo'],
//     ['Enero', enero],
//     ['Febrero', febrero],
//     ['Marzo', 660],
//     ['Abril', 1030],
//     ['Mayo', 1000],
//     ['Junio', 1170],
//     ['Julio', 660],
//     ['Agosto', 1000],
//     ['Setiembre', 1170],
//     ['Octubre', 660],
//     ['Noviembre', 1000],
//     ['Diembre', 1170]
//   ]);

//   var options = {
//     title: 'Company Performance',
//     hAxis: { title: 'Year', titleTextStyle: { color: '#02428C' } },
//     vAxis: { minValue: 0 }
//   };

//   var chart = new google.visualization.AreaChart(
//     document.getElementById('chart-div')
//   );
//   chart.draw(data, options);
// }
