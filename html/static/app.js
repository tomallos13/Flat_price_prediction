function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqr = document.getElementById("uiSqr").value;
  var rooms = document.getElementsByName("uiRooms");
  var selectedRooms = 1;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].checked) {
      selectedRooms = parseInt(rooms[i].value);
      break;
    }
  }
  var floor = document.getElementById("uiFloor").value;
  var terrace = document.getElementsByName("uiTerrace");
  var selectedTerrace = 0;
  for (var j = 0; j < terrace.length; j++) {
    if (terrace[j].checked) {
      selectedTerrace = parseInt(terrace[j].value);
      break;
    }
  }
  var street = document.getElementById("uiStreets").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
      sqr: parseFloat(sqr),
      rooms: selectedRooms,
      floor: floor,
      terrace: selectedTerrace,
      street: street
  }, function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " PLN</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_street_names";
  $.get(url, function(data, status) {
      console.log("got response");
      if (data) {
          var street = data.street;
          var uiStreets = document.getElementById("uiStreets");
          $('#uiStreets').empty();
          for (var i in street) {
              var opt = new Option(street[i]);
              $('#uiStreets').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
