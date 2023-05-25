var rootPath = "https://api.intuiface.com/webTriggers/v1/sendMessage"

$(document).ready(function () {

  //parse window location to retrieve apikey & device id

  var params = getJsonFromUrl();


  var apikey = params[ "apikey" ];
  var Deviceid = params[ "playerDeviceIDs" ];
  var sessionid = params[ "sessionid" ];

  alert("API Key = " + apikey);
  alert("Device ID = " + Deviceid);

  //parse all buttons to add onclick functions with proper url
  $(".webtrigger-button").each(function () {
    this.onclick = function () {
      var url = rootPath + "?apikey=" + apikey + "&playerDeviceIDs=" + Deviceid + "&message=" + this.getAttribute("message");
      //parse potential parameters
      if (this.getAttribute("parameter1") != undefined)
        url += "&parameter1=" + this.getAttribute("parameter1");
      if (this.getAttribute("parameter2") != undefined)
        url += "&parameter2=" + this.getAttribute("parameter2");

      //add session ID as parameter3
      url += "&parameter3=" + sessionid;

      //DEBUG only: to display the request before being sent
      //$('#request').html(url);
      var res = httpGet(url);

      //DEBUG only: to display the reponse
      //$('#response').html(res);

    };
  });

  //send initialization message
  var initUrl = rootPath + "?apikey=" + apikey + "&playerDeviceIDs=" + Deviceid + "&message=startNow&parameter3=" + sessionid;
  httpGet(initUrl);

});

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[ item[ 0 ] ] = decodeURIComponent(item[ 1 ]);
  });
  return result;
}

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}