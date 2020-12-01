window.onload = function() {
    document.getElementById("send-request").onclick(e => {
        console.log("Sent");
        let xhr = new XMLHttpRequest();

        let targetUrl = document.getElementById("url").innerHTML;  

        // True is for async
        xhr.open("POST", targetUrl, true);

        // going to have to add each one separately
        xhr.setRequestHeader('Content-Type', 'application/json');


        let data = {
            // Some base data is the same for everyone
            // Generate session
        };

        // add in the custom data from the inputs

        xhr.send(JSON.stringify(data));


        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;

            if (this.status === 200) {
                displaySuccess();

                // we get the returned data
            } else {
                console.log(this.status);
                displayFail();
            }

            // end of state change: it can be after some time (async)
        };
    });
};
  