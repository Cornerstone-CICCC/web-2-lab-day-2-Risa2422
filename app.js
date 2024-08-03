$(function () {
  // your code here
  let currentIndex = 1;
  buildHTML(currentIndex);

  function buildHTML(currentIndex) {
    getUserId(currentIndex).then((data) => {
      $(".info__image").children().attr({ src: data.image });
      $(".info__content").html(`<h3>${data.firstName} ${data.lastName}</h3>
      <p>Age:${data.age}</p><p>Email:${data.email}</p><p>Phone:${data.phone}</p>`);

      // post
      getPost(currentIndex).then((data1) => {
        console.log(data1);

        // h3
        $(".posts").children("h3").text(`${data.firstName}'s Posts`);

        let ul = $(".posts").children("ul");

        const li = $("<li>");
        if (data1.posts.length > 0) {
          for (let i = 0; i < data1.posts.length; i++) {
            // h4
            const title = $("<h4>");
            title.text(data1.posts[i].title);
            console.log(data1.posts);
            li.append(title);

            // data
            const content = $("<p>");
            content.text(data1.posts[i].body);
            li.append(content);
            ul.append(li);
          }
        } else {
          li.text("User has no posts");
          ul.append(li);
        }
      });

      // get todo
      getTodo(currentIndex).then((data2) => {
        // h3
        $(".todos").children("h3").text(`${data.firstName}'s To Dos`);

        let ul1 = $(".todos").children("ul");

        // 取得したデータをリストにする
        for (let i = 0; i < data2.todos.length; i++) {
          let li = $("<li>");

          // h4
          const title = $("<h4>");
          title.text(data2.todos[i].todo);
          li.append(title);
          ul1.append(li);
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

  // click a todo
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

  // Get post
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

  // Get todo
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
