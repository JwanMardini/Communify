async function fetchUsers(){
    let fetchedUsers = await fetch("https://dummyjson.com/users?limit=100")
    let users = await fetchedUsers.json()
    return users
  }

async function fetchPosts(){
    let fetchedPosts = await fetch("https://dummyjson.com/posts?limit=150")
    let posts = await fetchedPosts.json()
    return posts
}

async function fetchComments(){
    let fetchedComments = await fetch("https://dummyjson.com/comments?limit=340")
    let comments = await fetchedComments.json()
    return comments
}

async function Posts(){
    let fetchedPosts = await fetchPosts()
    return fetchedPosts.posts;
}

async function Users(){
    let fetchedUsers = await fetchUsers()
    return fetchedUsers.users;
}

async function Comments(){
    let fetchedComments = await fetchComments()
    return fetchedComments.comments;
}

async function fetchCommentsForPost(postId){
    let comments = await Comments()
    let commentsForPost = comments.filter(comment => comment.postId === postId)
    return commentsForPost
}

async function fetchUserById(userId){
    let users = await Users()
    let user = users.find(user => user.id === userId)
    return user
}

{/* <div class="post">
<header class="post-header">
    <h2 class="post-author">username</h2>
    <img src="https://placehold.co/30x30" alt="post3">
</header>
<h3 class="post-title">post title</h3>
<p class="post-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor incidunt reprehenderit repellendus ipsa dolores? Magni ullam dolorum animi nulla voluptas, doloremque voluptatibus ratione temporibus odio sint unde placeat eligendi.</p>
<p class="post-userId">User ID: <span class="userId"></span></p>
<p class="post-tags">Tags: <span class="tags"></span></p>
<p class="post-reactionCount">Reaction Count: <span class="reactionCount"></span></p>
<div class="comments">
    <!-- Comments will be appended here dynamically -->
</div>
</div> */}

async function createPostElement(username, img, title, body, userId, tags, reactionCount, postId){
    const container = document.querySelector(".main-posts")

    let post = document.createElement("div")
    post.classList.add("post")

    let header = document.createElement("header")
    header.classList.add("post-header")

    let author = document.createElement("h2")
    author.classList.add("post-author")

    let imgElement = document.createElement("img")
    imgElement.src = img
    imgElement.alt = title

    let postTitle = document.createElement("h3")
    postTitle.classList.add("post-title")

    let postBody = document.createElement("p")
    postBody.classList.add("post-body")

    let postUserId = document.createElement("p")
    postUserId.classList.add("post-userId")

    postUserId.innerText = "User ID: "

    let userIdSpan = document.createElement("span")
    userIdSpan.classList.add("userId")

    let postTags = document.createElement("p")
    postTags.classList.add("post-tags")

    postTags.innerText = "Tags: "

    let tagsSpan = document.createElement("span")
    tagsSpan.classList.add("tags")

    let postReactionCount = document.createElement("p")
    postReactionCount.classList.add("post-reactionCount")

    postReactionCount.innerText = "Reaction Count: "

    let reactionCountSpan = document.createElement("span")
    reactionCountSpan.classList.add("reactionCount")

    let postIdEl = document.createElement("p")
    postIdEl.classList.add("post-postId")

    postIdEl.innerText = "Post ID: "

    let postIdSpan = document.createElement("span")
    postIdSpan.classList.add("postId")


    let comments = document.createElement("div")
    comments.classList.add("comments")

    author.innerText = username
    postTitle.innerText = title
    postBody.innerText = body
    userIdSpan.innerText = userId
    tagsSpan.innerText = tags
    reactionCountSpan.innerText = reactionCount
    postIdSpan.innerText = postId

    postUserId.appendChild(userIdSpan)
    postTags.appendChild(tagsSpan)
    postReactionCount.appendChild(reactionCountSpan)
    postIdEl.appendChild(postIdSpan)
    
    header.appendChild(author)
    header.appendChild(imgElement)
    post.appendChild(header)
    post.appendChild(postTitle)
    post.appendChild(postBody)
    post.appendChild(postUserId)
    post.appendChild(postTags)
    post.appendChild(postReactionCount)
    post.appendChild(postIdEl)
    post.appendChild(comments)

    // Fetch comments for this post
    let postComments = await fetchCommentsForPost(postId);
    // Append comments to the post
    postComments.forEach(comment => {
        let commentElement = document.createElement("p");
        commentElement.classList.add("comment");
        commentElement.innerText = comment.body;
        comments.appendChild(commentElement);
    });

    container.appendChild(post)
}

async function displayPosts(){
    const posts = await Posts()
    const users = await Users()
    const comments = await Comments()

    let username = null
    let img = null
    let title = null
    let body = null
    let userId = null
    let tags = null
    let reactionCount = null
    let postId = null

    posts.forEach(post => {
        postId = post.id
        title = post.title
        body = post.body
        userId = post.userId
        tags = post.tags
        reactionCount = post.reactions

        users.forEach(user => {
            if(user.id === userId){
                img = user.image
            }

            comments.forEach(comment => {
                if(comment.user.id === postId){
                    username = comment.user.username
                }
            });
        });
        createPostElement(username, img, title, body, userId, tags, reactionCount, postId)
    
    });
}

displayPosts()


