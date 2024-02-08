let users = [];
let posts = [];
let comments = [];

async function fetchUsers() {
    try {
        let fetchedUsers = await fetch("https://dummyjson.com/users?limit=100");
        if (!fetchedUsers.ok) {
            throw new Error('Failed to fetch users');
        }
        let userData = await fetchedUsers.json();
        users = userData.users; // Update the outer variable
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
}

async function fetchPosts() {
    try {
        let fetchedPosts = await fetch("https://dummyjson.com/posts?limit=150");
        if (!fetchedPosts.ok) {
            throw new Error('Failed to fetch posts');
        }
        let postData = await fetchedPosts.json();
        posts = postData.posts; // Update the outer variable
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}

async function fetchComments() {
    try {
        let fetchedComments = await fetch("https://dummyjson.com/comments?limit=340");
        if (!fetchedComments.ok) {
            throw new Error('Failed to fetch comments');
        }
        let commentData = await fetchedComments.json();
        comments = commentData.comments; // Update the outer variable
    } catch (error) {
        console.error('Error fetching comments:', error.message);
    }
}

async function fetchAllData() {
    try {
        await fetchUsers();
        await fetchPosts();
        await fetchComments();
    } catch (error) {
        console.error('Error fetching all data:', error.message);
    }
}


// async function displayData() {
//     await fetchAllData();
//     console.log(users);
//     console.log(posts);
//     console.log(comments);
// }


function fetchCommentsForPost(postId){
    let commentsForPost = comments.filter(comment => comment.postId === postId)
    return commentsForPost
}

function fetchUserById(userId){
    let user = users.find(user => user.id === userId)
    return user
}

function fetchImgById(userId){
    let user = users.find(user => user.id === userId)
    return user.image
}

// how post should look like
{/*
<div class="post">
    <header class="post-header">
        <a href="#" id="userId" class="post-author">username</a>
        <img src="img" alt="post title">
    </header>
    <h3 class="post-title">post title</h3>
    <p class="post-body">post body</p>
    <p class="post-userId">User ID: <span class="userId">userId</span></p>
    <p class="post-tags">Tags: <span class="tags">tags</span></p>
    <p class="post-reactionCount">Reaction Count: <span class="reactionCount">reactionCount</span></p>
    <p class="post-postId">Post ID: <span class="postId">postId</span></p>
    <div class="comments">
        <!-- Comments will be appended here dynamically -->
        <div class="comment">
            <header class="comment-header">
                <img src="https://placehold.co/30x30" alt="">
                <h4 class="comment-username">username</h4>
            </header>
            <p class="comment-body">This is some awesome thinking!</p>
        </div>
    </div>
</div>

*/}

const container = document.querySelector(".main-posts")

// Function to create a comment element
function createCommentElement(comment) {
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    let commentHeader = document.createElement("header");
    commentHeader.classList.add("comment-header");

    let commentImg = document.createElement("img");
    commentImg.src = fetchImgById(comment.user.id);
    commentImg.alt = "User Image";

    let commentUsername = document.createElement("h4");
    commentUsername.classList.add("comment-username");
    commentUsername.innerText = comment.user.username;

    let commentBody = document.createElement("p");
    commentBody.classList.add("comment-body");
    commentBody.innerText = comment.body;

    commentHeader.appendChild(commentImg);
    commentHeader.appendChild(commentUsername);
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentBody);

    return commentDiv;
}

// Function to create a post element
function createPostElement(post) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");

    let postHeader = document.createElement("header");
    postHeader.classList.add("post-header");

    let authorLink = document.createElement("a");
    authorLink.href = "#";
    authorLink.classList.add("post-author");
    authorLink.innerText = fetchUserById(post.userId).username;
    authorLink.addEventListener("click", (event) => {
        event.preventDefault();
        showUserDetails(post.userId);
    });

    let authorImg = document.createElement("img");
    authorImg.src = fetchImgById(post.userId);
    authorImg.alt = fetchUserById(post.userId).username;

    let postTitle = document.createElement("h3");
    postTitle.classList.add("post-title");
    postTitle.innerText = post.title;

    let postBody = document.createElement("p");
    postBody.classList.add("post-body");
    postBody.innerText = post.body;

    let postUserId = document.createElement("p");
    postUserId.classList.add("post-userId");
    postUserId.innerText = "User ID: ";
    let userIdSpan = document.createElement("span");
    userIdSpan.classList.add("userId");
    userIdSpan.innerText = post.userId;
    postUserId.appendChild(userIdSpan);

    let postTags = document.createElement("p");
    postTags.classList.add("post-tags");
    postTags.innerText = "Tags: ";
    let tagsSpan = document.createElement("span");
    tagsSpan.classList.add("tags");
    tagsSpan.innerText = post.tags;
    postTags.appendChild(tagsSpan);

    let postReactionCount = document.createElement("p");
    postReactionCount.classList.add("post-reactionCount");
    postReactionCount.innerText = "Reaction Count: ";
    let reactionCountSpan = document.createElement("span");
    reactionCountSpan.classList.add("reactionCount");
    reactionCountSpan.innerText = post.reactions;
    postReactionCount.appendChild(reactionCountSpan);

    let postPostId = document.createElement("p");
    postPostId.classList.add("post-postId");
    postPostId.innerText = "Post ID: ";
    let postIdSpan = document.createElement("span");
    postIdSpan.classList.add("postId");
    postIdSpan.innerText = post.id;
    postPostId.appendChild(postIdSpan);

    let commentsDiv = document.createElement("div");
    commentsDiv.classList.add("comments");

    postHeader.appendChild(authorLink);
    postHeader.appendChild(authorImg);
    postDiv.appendChild(postHeader);
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postBody);
    postDiv.appendChild(postUserId);
    postDiv.appendChild(postTags);
    postDiv.appendChild(postReactionCount);
    postDiv.appendChild(postPostId);
    postDiv.appendChild(commentsDiv);

    // Fetch comments for this post
    let postComments = fetchCommentsForPost(post.id);
    postComments.forEach(comment => {
        let commentElement = createCommentElement(comment);
        commentsDiv.appendChild(commentElement);
    });

    return postDiv;
}

// Function to render posts
async function renderPosts() {
    await fetchAllData();

    posts.forEach(post => {
        let postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

// Function to display user details
function showUserDetails(userId) {
    let user = fetchUserById(userId);
    console.log("User ID: ", user);
}

renderPosts();
