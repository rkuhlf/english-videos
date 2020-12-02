// PYTHON CODE
/*
start_video = 2679
end_video = start_video + 9

for id in range(start_video, end_video):
    headers = {
        "Content-Type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDY1NjYxMzYsImlhdCI6MTYwNjU2MjUzNiwibmJmIjoxNjA2NTYyNTM2LCJqdGkiOiJlZWIyZGMxYS1kZjA2LTQ1MGYtYTlmYi02ZWU1OTcwZDAzZGQiLCJpZGVudGl0eSI6eyJhbV91c2VyX2lkIjoyMjEwODUwMTMsImltcG9ydF9pZCI6Ijk0ODMyMjIwIiwidXNlcm5hbWUiOiIyNzdVNTk3V3xyaWxleWs0MkBpY2xvdWQuY29tIiwicHJlZmVyZW5jZXMiOnt9LCJwaWxvdCI6InAyXzIwMThfMDgifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnt9fQ.ZNjdMy-M5q9gXHEyTo_M7Kop3IcZW2FEtb-GgiSTWjI"
    }

    data = {

        "query": "mutation StoreDailyVideoProgressMutation($userId: Int!, $cbPersonid: String!, $videoId: Int!, $status: String!, $progress: String!, $watchedPercentage: String!, $playTimePercentage: String) {\n  storeDailyVideoProgress(userId: $userId, videoId: $videoId, status: $status, cbPersonid: $cbPersonid, progress: $progress, watchedPercentage: $watchedPercentage, playTimePercentage: $playTimePercentage) {\n    ok\n    __typename\n  }\n}\n",

        "variables": {
            "userId": 221085013,  # probably shouldn't make this public
            "videoId": id,  # This determines which video you watch
            "progress": [
                1,
                1 repeated like 800 times (I assume one for each second)
            ],
            "status": "COMPLETE",
            "cbPersonid": "94832220",
            "watchedPercentage": "1.00",
            "playTimePercentage": "1.0001"
        },
        "operationName": "StoreDailyVideoProgressMutation"
    }
    url = "https://apc-api-production.collegeboard.org/fym/graphql"

    # make sure to use json (in args) to match what request it is supposed to be
    request = requests.post(url, json=data, headers=headers)
    print("-" * 20)
    print(id)
    print("-" * 10)
    print(request.status_code)
    print(request.text[:300])
*/

window.onload = function () {
  document.getElementById("send-request").onclick((e) => {
    console.log("Sent");
    let xhr = new XMLHttpRequest();

    let targetUrl = document.getElementById("url").innerHTML;

    const startVideo = parseInt(
      document.getElementById("startVideo").innerHTML,
      10
    );
    const endVideo = parseInt(
      document.getElementById("endVideo").innerHTML,
      10
    );

    for (let id = startVideo; id < endVideo; id++) {
      // True is for async
      xhr.open("POST", targetUrl, true);

      // going to have to add each one separately
      xhr.setRequestHeader("Content-Type", "application/json");
      // This one might have to be different for each user
      xhr.setRequestHeader(
        "authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDY1NjYxMzYsImlhdCI6MTYwNjU2MjUzNiwibmJmIjoxNjA2NTYyNTM2LCJqdGkiOiJlZWIyZGMxYS1kZjA2LTQ1MGYtYTlmYi02ZWU1OTcwZDAzZGQiLCJpZGVudGl0eSI6eyJhbV91c2VyX2lkIjoyMjEwODUwMTMsImltcG9ydF9pZCI6Ijk0ODMyMjIwIiwidXNlcm5hbWUiOiIyNzdVNTk3V3xyaWxleWs0MkBpY2xvdWQuY29tIiwicHJlZmVyZW5jZXMiOnt9LCJwaWxvdCI6InAyXzIwMThfMDgifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnt9fQ.ZNjdMy-M5q9gXHEyTo_M7Kop3IcZW2FEtb-GgiSTWjI"
      );
      let data = {
        // Some base data is the same for everyone
        // Generate session
        query:
          "mutation StoreDailyVideoProgressMutation($userId: Int!, $cbPersonid: String!, $videoId: Int!, $status: String!, $progress: String!, $watchedPercentage: String!, $playTimePercentage: String) {\n  storeDailyVideoProgress(userId: $userId, videoId: $videoId, status: $status, cbPersonid: $cbPersonid, progress: $progress, watchedPercentage: $watchedPercentage, playTimePercentage: $playTimePercentage) {\n    ok\n    __typename\n  }\n}\n",

        // need to get all this stuff without inspecting anything
        // This part might be incredibly difficult
        // I believe ctrl-u would work, but most of the variables are probably dynamically computed
        variables: {
          userId: 1, // (221085013) probably shouldn't make this public
          videoId: id, // (199) This determines which video you watch
          progress: new Array(1000).fill(1),
          status: "COMPLETE",
          cbPersonid: "", // (94832220) This is different for each person too
          watchedPercentage: "1.00",
          playTimePercentage: "1.0001"
        },
        operationName: "StoreDailyVideoProgressMutation"
      };

      // add in the custom data from the inputs

      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = function () {
        //   This is going to get somewhat complicated
        // Need to determine when every single request is back
        // Maybe make an array filled with zeros for every endvideo - startvideo
        // Fail is -1, pass is 1
        if (this.readyState !== 4) return;

        if (this.status === 200) {
          displaySuccess();

          // we get the returned data
        } else {
          console.log(this.status);
          displayFail();
        }
      };

      // end of state change: it can be after some time (async)
    }
  });
};

const displaySuccess = () => {
  // show the html for success
};

const displayFail = () => {};

// Alternator buttons for raw vs simple
// Maybe some buttons to scroll through the content for how to get the id from the website
