$(document).ready(() => {
  $.ajax({
    url: "/total",
    method: "GET",
    success: result => {
      operations(result);
    },
  })
  $.ajax({
    url: "/affected-countries",
    method: "GET",
    success: result => {
      countries(result);
    },
  })
  setInterval(() => {
    $.ajax({
      url: "/total",
      method: "GET",
      success: result => {
        operations(result);
        console.log(result);
      },
    })
  }, 60000);


  function operations(result) {
    const confirmed = document.getElementById('confirmed');
    const recovered = document.getElementById('recovered');
    const critical = document.getElementById('critical');
    const deaths = document.getElementById('deaths');

    confirmed.innerHTML = "Confirmed " + result.data[0].confirmed
    recovered.innerHTML = "Recovered " + result.data[0].recovered
    critical.innerHTML = "Critical " + result.data[0].critical
    deaths.innerHTML = "Deaths " + result.data[0].deaths
  }


  function countries(result) {
    const countries = document.getElementById('countries-list');
    const affectedCountries = document.getElementById('affected-countries');
    affectedCountries.innerHTML = "Total Affected Countries " + result.data.length;

    for (let i = 0; i < result.data.length; i++) {
      let opt = document.createElement('option');
      opt.value = result.data[i].name;
      opt.innerHTML = result.data[i].name;
      countries.appendChild(opt);
    }
    console.log(result);
  }
})

function run() {
  const countryName = document.getElementById('countries-list').value;
  console.log(countryName);
  if (countryName !== "") {
    $.ajax({
      url: "/country/" + countryName,
      method: "GET",
      success: result => {
        if (result.status == false) {
          console.log(result);
          alert("Please send one request at a time");
        }
        else {
          operations(result);
        }
      },
    })
  }
}

function operations(result) {
  const { active, confirmed, deaths, province, recovered } = result.data[0].provinces[0];
  console.log(active);
  console.log(result.data[0].provinces[0]);
  const confirmed1 = document.getElementById('confirmed');
  const recovered1 = document.getElementById('recovered');
  const critical1 = document.getElementById('critical');
  const deaths1 = document.getElementById('deaths');

  confirmed1.innerHTML = "Confirmed " + confirmed
  recovered1.innerHTML = "Recovered " + recovered
  critical1.innerHTML = "Active " + active
  deaths1.innerHTML = "Deaths " + deaths

  const countryName = document.getElementById('affected-countries');
  countryName.innerHTML = "Country " + province;
}