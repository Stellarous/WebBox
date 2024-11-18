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
// Add this to the end of the existing script.js file

// Get the new post form and add an event listener
const newPostForm = document.getElementById('new-post-form');
newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const postTitle = document.getElementById('post-title').value;
  const postDate = document.getElementById('post-date').value;
  const postContent = document.getElementById('post-content').value;

  // Create a new post object
  const newPost = {
    title: postTitle,
    date: postDate,
    file: `posts/${postTitle.toLowerCase().replace(/\s/g, '-')}.md`
  };

  // Save the post to a file (or a database)
  savePostToFile(newPost, postContent);

  // Reset the form
  newPostForm.reset();
});

function savePostToFile(post, content) {
  // Here, you would need to implement the logic to save the post to a file or a database
  // For example, you could use the Fetch API to send the data to a server-side script
  console.log('Saving post:', post);
  console.log('Post content:', content);
}
