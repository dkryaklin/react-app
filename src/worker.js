const IMAGE_SIZE = 136;

let allItems = [];

let prevQuery = "";
let prevFilteredItems = [];

function fetchItems(data) {
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
          id: Date.now() + Math.round(Math.random() * 1000000000),
          position: index,
          avatar,
          avatarSrcSet: avatarSrcSet.join(", "),
        };
      });

      postMessage({ ...data, results: allItems });
    });
}

function filterItems(data, query) {
  let searchItems;
  let searchQuery = query.toLowerCase();

  if (searchQuery === "") {
    postMessage({ ...data, results: allItems });
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

  postMessage({ ...data, results: items });
}

onmessage = function (e) {
  const { fn } = e.data;

  if (fn === "fetchItems") {
    fetchItems(e.data, ...(e.data.data || []));
  } else if (fn === "searchItems") {
    filterItems(e.data, ...(e.data.data || []));
  }
};
