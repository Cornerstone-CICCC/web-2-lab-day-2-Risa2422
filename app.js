$(function () {
  // your code here
  let currentIndex = 1;
  const postList = $(".posts").children("ul");
  const todoList = $(".todos").children("ul");
  const container = $(".container");

  // get the data and show
  buildHTML(currentIndex);

  function buildHTML(currentIndex) {
    getUserId(currentIndex).then((data) => {
      $(".info__image").children("img").attr("src", data.image);
      $(".info__content").html(`
        <h3>${data.firstName} ${data.lastName}</h3>
        <p>Age:${data.age}</p>
        <p>Email:${data.email}</p>
        <p>Phone:${data.phone}</p>`);

      // get post data
      getPost(currentIndex).then((postData) => {
        postList.empty();

        $(".posts").children("h3").text(`${data.firstName}'s Posts`);

        if (postData.posts.length > 0) {
          for (let i = 0; i < postData.posts.length; i++) {
            postId = postData.posts[i].id;
            const getPostList = $("<li>");

            // titile of post
            const title = $("<h4>");
            title.attr(`post-id`, postData.posts[i].id);
            title.text(postData.posts[i].title);
            getPostList.append(title);

            // data of post
            const content = $("<p>");
            content.text(postData.posts[i].body);
            getPostList.append(content);
            postList.append(getPostList);
          }
        } else {
          const getPostList = $("<li>");
          getPostList.text("User has no posts");
          postList.append(getPostList);
        }
      });

      // get todos data
      getTodo(currentIndex).then((todoData) => {
        todoList.empty();

        $(".todos").children("h3").text(`${data.firstName}'s To Dos`);

        if (todoData.todos.length > 0) {
          for (let i = 0; i < todoData.todos.length; i++) {
            const getTodoList = $("<li>");

            // data of todos
            const title = $("<p>");
            title.text(todoData.todos[i].todo);
            getTodoList.append(title);
            todoList.append(getTodoList);
          }
        } else {
          const getTodoList = $("<li>");
          getTodoList.text("User has no todos");
          todoList.append(getTodoList);
        }
      });
    });
  }

  // click a post title
  $(".posts")
    .children("h3")
    .on("click", function () {
      $(this).next().slideToggle();
    });

  // click a todo title
  $(".todos")
    .children("h3")
    .on("click", function () {
      $(this).next().slideToggle();
    });

  // clicke the previous button
  $("button:nth-of-type(1)").on("click", function () {
    if (currentIndex === 1) {
      currentIndex = 30;
    }
    currentIndex--;
    buildHTML(currentIndex);
  });

  // clicke the next button
  $("button:nth-of-type(2)").on("click", async function () {
    if (currentIndex === 30) {
      currentIndex = 1;
    }
    currentIndex++;
    buildHTML(currentIndex);
  });

  // clicke the post titile
  $(".posts")
    .find("ul")
    .on("click", "h4", function () {
      const postId = $(this).attr("post-id");
      getPostByPostid(postId).then((data) => {
        const overlay = $("<div>");
        overlay.html(`
          <div class='modal'>
            <h3>${data.title}</h3>
            <p>${data.body}</p>
            <p>views:${data.views}</p>
            <button>close</button>
          </div>`);
        overlay.addClass("overlay");
        container.append(overlay);
      });
    });

  container.on("click", ".overlay button", function () {
    $(this).parent().parent().remove();
  });

  // Get userID
  function getUserId(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}`,
        type: "GET",
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  // Get posts data
  function getPost(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}/posts`,
        type: "GET",
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  // Get todos data
  function getTodo(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}/todos`,
        type: "GET",
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  // Get a postid
  function getPostByPostid(postid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/posts/${postid}`,
        type: "GET",
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }
});
