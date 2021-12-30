const IMAGE_SIZE = 136;

let allItems = [];

let prevQuery = "";
let prevFilteredItems = [];

function fetchItems(fn) {
  fetch(
    "https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json"
  )
    .then((data) => data.json())
    .then((json) => {
      allItems = json.map((item, index) => {
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
      });

      postMessage([fn, { items: allItems }]);
    });
}

function filterItems(fn, query) {
  let searchItems;
  let searchQuery = query.toLowerCase();

  if (searchQuery === "") {
    postMessage([fn, { query, items: allItems }]);
    return;
  }

  if (prevQuery && searchQuery.startsWith(prevQuery)) {
    searchItems = [...prevFilteredItems];
  } else {
    searchItems = [...allItems];
  }

  const items = searchItems.reduce((acc, item, index) => {
    const isFit = ["city", "name", "title", "address", "email"].some((field) =>
      item[field].toLowerCase().includes(searchQuery)
    );

    if (isFit) {
      acc.push({
        ...item,
        position: acc.length,
      });
    }

    return acc;
  }, []);

  prevQuery = searchQuery;
  prevFilteredItems = items;

  postMessage([fn, { query, items }]);
}

onmessage = function (e) {
  const [fn, args] = e.data;

  if (fn === "fetchItems") {
    fetchItems(fn, ...(args || []));
  } else if (fn === "searchItems") {
    filterItems(fn, ...(args || []));
  }
};
