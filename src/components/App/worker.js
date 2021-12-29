const IMAGE_SIZE = 136;

function fetchItems() {
  fetch(
    "https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json"
  )
    .then((data) => data.json())
    .then((json) => {
      postMessage(
        json.map((item, index) => {
          const avatar = item.avatar.replace(
            "300x300",
            `${IMAGE_SIZE}x${IMAGE_SIZE}`
          );

          const avatarSrcSet = [];

          for (let i = 1; i < 4; i++) {
            avatarSrcSet.push(
              `${item.avatar.replace(
                "300x300",
                `${IMAGE_SIZE * i}x${IMAGE_SIZE * i}`
              )} ${i}x`
            );
          }

          return {
            ...item,
            position: index,
            avatar,
            avatarSrcSet: avatarSrcSet.join(", "),
          };
        })
      );
    });
}

onmessage = function (e) {
  if (e.data === "fetchItems") {
    fetchItems();
  }

  // console.log("Message received from main script");
  // var workerResult = "Result: " + e.data[0] * e.data[1];
  // console.log("Posting message back to main script");
  // postMessage(workerResult);
};
