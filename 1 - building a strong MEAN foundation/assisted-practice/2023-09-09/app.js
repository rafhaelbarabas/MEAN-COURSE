// const getData = () => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("get", "https://jsonplaceholder.typicode.com/posts");
//     xhr.responseText = "json";
//     xhr.onload = () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         const postsList = xhr.response;
//         console.log(postsList);
//         resolve(postsList);
//       } else {
//         reject(`Request error, having status: ${xhr.status}`);
//       }
//     };
//     xhr.send();
//   });
// };

const postTemplate = document.getElementById("post-item");
const listElement = document.querySelector(".posts");
const fetchBtn = document.getElementById("fetch-button");

console.log("postTemplate", postTemplate);
console.log("listElement", listElement);
console.log("fetch", fetchBtn);

const sendHttpRequest = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);

    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send();
  });
};

const fetchPosts = async () => {
  const postsList = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  for (const post of postsList) {
    const postElement = document.importNode(postTemplate.content, true);

    postElement.querySelector("h2").textContent = post.title;
    postElement.querySelector("p").textContent = post.body;
    listElement.append(postElement);
  }
};

const createPost = async (title, content) => {
  const savePost = await sendHttpRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    {
      title,
      body: content,
      userId: Math.random(),
    }
  );

  console.log(`Saved post id: ${savePost}`);
};

createPost("Sample post", "dummy content");

fetchBtn.addEventListener("click", fetchPosts);
