// Fetch Markdown files and render them as blog posts
fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.querySelector('.posts');

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      fetch(post.file)
        .then(response => response.text())
        .then(markdown => {
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p class="date">${post.date}</p>
            <div class="content">${marked(markdown)}</div>
          `;
          postsContainer.appendChild(postElement);
        });
    });
  })
  .catch(error => console.error(error));
