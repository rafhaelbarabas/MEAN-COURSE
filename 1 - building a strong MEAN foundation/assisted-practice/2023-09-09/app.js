let postIdCounter = 100;
const postsResourceUrl = "https://jsonplaceholder.typicode.com/posts";

const postTemplate = document.getElementById("post-item");
const listElement = document.querySelector(".posts");
const fetchBtn = document.getElementById("fetch-button");

const sendHttpRequest = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.onload = () => {
      if (xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(
          `An error was found during perform request. Status code: ${xhr.status}`
        );
      }
    };

    if (data !== null && data !== undefined) {
      const jsonData = JSON.stringify(data);
      xhr.send(jsonData);
    } else {
      xhr.send();
    }

    xhr.onerror = (ev) =>
      reject("Some error was found during perform request.");
  });
};

const deletePostCard = (postId) => {
  const divElements = listElement.querySelectorAll("div");

  for (div of divElements) {
    if (div.id == postId) {
      if (window.confirm("Are you sure?")) {
        listElement.removeChild(div);
      }
    }
  }
};

const appendPostElement = (title, content, postId) => {
  const postElement = document.importNode(postTemplate.content, true);
  const postCardDiv = postElement.querySelector("div");
  postCardDiv.setAttribute("id", postId);
  postElement.querySelector("h2").textContent = title;
  postElement.querySelector("p").textContent = content;
  const deleteButton = postElement.querySelector("button");
  deleteButton.addEventListener("click", () => deletePostCard(postId));
  listElement.append(postElement);
};

const fetchPosts = async () => {
  const postsList = await sendHttpRequest("GET", postsResourceUrl);
  for (const post of postsList) {
    appendPostElement(post.title, post.body, post.id);
  }
};

const createPost = async (title, body) => {
  const userId = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  await sendHttpRequest("POST", postsResourceUrl, {
    title,
    body,
    userId,
  })
    .then((res) => {
      postIdCounter++;
      appendPostElement(title, body, postIdCounter);
    })
    .catch((err) => window.alert(err));
};

fetchBtn.addEventListener("click", fetchPosts);

const form = document.getElementById("post-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const { title, content } = Object.fromEntries(data.entries());
  createPost(title, content);
  setTimeout(() => event.target.reset(), 600);
});
