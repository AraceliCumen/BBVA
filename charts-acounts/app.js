var totalAcounts = $(".cant-acounts");
var numbersAcounts = $(".num-acounts");
var income = $('.income');
var consumption = $('.consumtion');
let url = "https://api.myjson.com/bins/17a7z1?pretty=1";

$.ajax({
  url: url,
  contentType: "application/json",
  method: "GET",
  success: function(response) {
    console.log(response);
    // console.log(response.DATA);
    getStatus(response);
  }
});

// Estadod de cuenta
function getStatus(data) {
  if (data.CODIGO_ESTADO === 200) {
    dataAccounts(data);
  }
}
var i = 0;
var consum;
// Muestra número de cuenta, saldo y suma de saldos.
function dataAccounts(data) {
  // console.log(data.DATA.LISTA_CTA);
  var cantAcounts = data.DATA.LISTA_CTA;
  var creditCount = data.DATA.LISTA_TARJ;
  totalAcounts.html(`Tienes ${cantAcounts.length} cuentas en BBVA`);
  
  $.each(cantAcounts, function(index, value) {
    numbersAcounts.append(`<p>${value.NCUENTA}</p>`);
    var num = parseFloat(value.SALDO.replace(",", ""));
    numbersAcounts.append(`<p>${num}</p>`);
    // Suma total de cuentas saldo
    i += num;
  });
  $.each(creditCount, function(index, value) {
    numbersAcounts.append(`<p>${value.NUMEROTARJETA}</p>`);
    var creditAble = parseFloat(value.CREDITODISPONIBLE.replace(",", ""));
    var creditLimit = parseFloat(value.LIMITECREDITO.replace(",", ""));

    consum = creditLimit - creditAble;
    numbersAcounts.append(`<p>${creditAble}</p>`);

  })
  income.append(`Su ingreso total es ${i.toFixed(2)}`);
  consumption.append(`Su egreso es de ${consum}`);
  console.log(`${i.toFixed(2)}`);
  console.log(`${consum}`);
};


// Google charts

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Ingreso", 7258.8],
    ['Consumo', 14500]
  ]);
console.log(typeof(`${i.toFixed(2)}`));
console.log(`${consum}`);
  var options = {
    title: "My Daily Activities",
    pieHole: 0.4
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donut1")
  );
  var options = {
    colors: ['#02428C', '#b2353e']
  };
  chart.draw(data, options);
}
