export default function DisplayPosts({ posts }) {
  if (posts.length > 1) {
    console.log("user has made multiple posts");
    return (
      <div>
        <h2>My Posts</h2>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id}>
                <p>Content: {post.content}</p>
                <p>Likes: {post.likes}</p>
              </div>
            );
          })}
      </div>
    );
  } else {
    return (
      <div>
        <h2>My Posts</h2>
        <div>
          <p>Content: {posts.content}</p>
          <p>Likes: {posts.likes}</p>
        </div>
      </div>
    );
  }
}
