function csvToArray(filename, cb) {
  $.get(filename, function(csvdata) {
    //CSVのパース作業
    csvdata = csvdata.replace(/\r/gm, "");
    var line = csvdata.split("\n"),
    ret = [];
    for (var i in line) {
      //空行はスルーする。
      if (line[i].length == 0) continue;

      var row = line[i].split(",");
      ret.push(row);
    }
    cb(ret);
  });
}

function putMarker(map,current){

  var latlng = new google.maps.LatLng(current[5]-0,current[6]-0);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title:current[0]
  });

  var url=current[4]
  var areaFull=current[2]+current[0]
  var infowindow=new google.maps.InfoWindow({
    content: areaFull+"<br>"+"<a href='"+url+"'>"+url+"</a>"+"<br>"+"更新日"+current[3]
  });

  var infoCall=function(i){
    return function(){infowindow.open(map,marker)};
  }()
  google.maps.event.addListener(marker, 'click',infoCall);
}

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(36.561325,136.656205),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


  csvToArray("5374_cities.csv",function(data){
    var label = data.shift();
    for (var i in data){
      putMarker(map,data[i])
    }
  })

}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBNJWgPCGFRNCcs7ZMf10ydCgwnDisGVUU&sensor=TRUE&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;