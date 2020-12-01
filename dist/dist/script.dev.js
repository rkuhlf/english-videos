"use strict";

window.onload = function () {
  document.getElementById("send-request").onclick(function (e) {
    console.log("Sent");
    var xhr = new XMLHttpRequest();
    var targetUrl = document.getElementById("url").innerHTML; // True is for async

    xhr.open("POST", targetUrl, true); // going to have to add each one separately

    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = {// Some base data is the same for everyone
      // Generate session
    }; // add in the custom data from the inputs

    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;

      if (this.status === 200) {
        displaySuccess(); // we get the returned data
      } else {
        console.log(this.status);
        displayFail();
      } // end of state change: it can be after some time (async)

    };
  });
};
//# sourceMappingURL=script.dev.js.map
