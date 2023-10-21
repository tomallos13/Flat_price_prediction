function getFloorValue() {
    var uiFloor = document.getElementsByName("uiFloor");
    for(var i in uiFloor) {
      if(uiFloor[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getRoomsValue() {
    var uiRooms = document.getElementsByName("uiRooms");
    for(var i in uiRooms) {
      if(uiRooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqr = document.getElementById("uiSqr");
    var rooms = getRoomsValue();
    var floor = getFloorValue();
    var street = document.getElementById("uiStreets");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price";
    // var url = "/api/predict_home_price";
  
    $.post(url, {
        sqr: parseFloat(sqr.value),
        rooms: rooms,
        floor: floor,
        street: street.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " PLN</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_street_names";
    // var url =street";
    $.get(url,function(data, status) {
        console.log("got responstreet request");
        if(data) {
            var street = data.street;
            var uiStreets = document.getElementById("uiStreets");
            $('#uiStreets').empty();
            for(var i in street) {
                var opt = new Option(street[i]);
                $('#uiStreets').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;