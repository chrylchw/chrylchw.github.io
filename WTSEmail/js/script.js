var rootPath = "https://api.intuiface.com/webTriggers/v1/sendMessage"

$(document).ready(function () {

    //parse window location to retrieve apikey & device id

    var params = getJsonFromUrl();


    var apikey = params["apikey"];
    var Deviceid = params["playerDeviceIDs"];
    var sessionid = params["sessionid"];

    alert("API Key = " + apikey);
    alert("Device ID = " + Deviceid);

    //parse all buttons to add onclick functions with proper url
    $(".webtrigger-button").each(function () {
        this.onclick = function () {

            x = document.getElementById("email").value;
            console.log(x)

            var url = rootPath + "?apikey=" + apikey + "&Deviceid=" + Deviceid + "&message=" + this.getAttribute("message");
            //parse potential parameters
            if (this.getAttribute("parameter1") != undefined)
                url += "&parameter1=" + this.getAttribute("parameter1");
            if (this.getAttribute("parameter2") != undefined)
                url += "&parameter2=" + x;

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
    var initUrl = rootPath + "?apikey=" + apikey + "&Deviceid=" + Deviceid + "&message=startNow&sessionid=" + sessionid;
    httpGet(initUrl);

});

function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



// function ValidateEmail(inputText) {
//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (inputText.value.match(mailformat)) {
//     alert("Valid email address!");
//     document.form1.email.focus();

//     x = document.getElementById("email").value;
//     console.log(x)

//     return true;
//   }
//   else {
//     alert("You have entered an invalid email address!");
//     document.form1.email.focus();
//     return false;
//   }
// }
