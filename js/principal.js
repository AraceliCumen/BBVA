$(document).ready(function () {
    $('.sidenav').sidenav();
});

var $spendMonth = $('.spend-month-p');
var url = 'https://alejandracp.github.io/BBVA-Json/data.json';

var proxy = 'https://cors-anywhere.herokuapp.com/';

$.ajax({
  url: proxy + url,
  contentType: 'application/json',
  method: 'GET',
  success: function(response) {
    getStatus(response);
    expensesMonths(response);
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
  var cantAcounts = data.DATA.LISTA_CTA;
  var creditCount = data.DATA.LISTA_TARJ;
//   totalAcounts.html(`Tienes ${cantAcounts.length} cuentas en BBVA`);
  $.each(cantAcounts, function(index, value) {
    // numbersAcounts.append(`<p>${value.NCUENTA}</p>`);
    var num = parseFloat(value.SALDO.replace(',', ''));
    // numbersAcounts.append(`<p>${num}</p>`);
    // Suma total de cuentas saldo
    i += num;
  });
  $.each(creditCount, function(index, value) {
    // numbersAcounts.append(`<p>${value.NUMEROTARJETA}</p>`);
    var creditAble = parseFloat(value.CREDITODISPONIBLE.replace(',', ''));
    var creditLimit = parseFloat(value.LIMITECREDITO.replace(',', ''));
    consum = creditLimit - creditAble;
    // numbersAcounts.append(`<p>${creditAble}</p>`);
  });
//   income.append(`Su ingreso total es ${i.toFixed(2)}`);
  $spendMonth.append(`${consum.toFixed(2)}`);
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
// google.charts.setOnLoadCallback(drawChart2);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'dg'],
    ['Ingreso', Number(i.toFixed(2))],
    ['Consumo', Number(consum.toFixed(2))]
  ]);
  var options = {
    title: 'Consumo vs Ingreso',
    // pieHole: 0.4,
    colors: ['#02428C', '#e7101e']
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('donut1')
  );
  chart.draw(data, options);
}

var enero = 0;
febrero = 0;
marzo = 0;
abril = 0;
mayo = 0;
junio = 0;
julio = 0;
agosto = 0;
setiembre = 0;
octubre = 0;
noviembre = 0;
diciembre = 0;
function expensesMonths(data) {
  var cantAcounts = data.DATA.LISTA_CTA;
  $.each(cantAcounts, function(index, value) {
    enero += parseFloat(value.EGRESOS.MESES.ENERO);
    febrero += parseFloat(value.EGRESOS.MESES.FEBRERO);
    marzo += parseFloat(value.EGRESOS.MESES.MARZO);
    abril += parseFloat(value.EGRESOS.MESES.ABRIL);
    mayo += parseFloat(value.EGRESOS.MESES.MAYO);
    junio += parseFloat(value.EGRESOS.MESES.JUNIO);
    julio += parseFloat(value.EGRESOS.MESES.JULIO);
    agosto += parseFloat(value.EGRESOS.MESES.AGOSTO);
    setiembre += parseFloat(value.EGRESOS.MESES.SETIEMPBRE);
    octubre += parseFloat(value.EGRESOS.MESES.OCTUBRE);
    noviembre += parseFloat(value.EGRESOS.MESES.NOVIEMBRE);
    diciembre += parseFloat(value.EGRESOS.MESES.DICIEMBRE);
  });
  console.log(setiembre);
}

// Google charts donuts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'dg'],
    ['Ingreso', Number(i.toFixed(2))],
    ['Consumo', Number(consum.toFixed(2))]
  ]);
  var options = {
    title: 'My Daily Activities',
    pieHole: 0.4,
    colors: ['#02428C', '#e7101e']
  };

  var chart = new google.visualization.PieChart(
    document.getElementById('donut1')
  );
  chart.draw(data, options);
}

// google charts year

function drawChart2() {
  var data = new google.visualization.arrayToDataTable([
    ['Mes', 'Consumo'],
    ['Enero', enero],
    ['Febrero', febrero],
    ['Marzo', marzo],
    ['Abril', abril],
    ['Mayo', mayo],
    ['Junio', junio],
    ['Julio', julio],
    ['Agosto', agosto],
    ['Setiembre', setiembre],
    ['Octubre', octubre],
    ['Noviembre', noviembre],
    ['Diembre', diciembre]
  ]);

  var options = {
    title: 'Gasto mensual 2017',
    hAxis: { title: 'Year', titleTextStyle: { color: '#02428C' } },
    vAxis: { minValue: 0 }
  };

  var chart = new google.visualization.AreaChart(
    document.getElementById('chart-div')
  );
  chart.draw(data, options);
}