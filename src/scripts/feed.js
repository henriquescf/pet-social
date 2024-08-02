import { getPosts, getPost, getUserProfile, createPost, editPost, deletePost } from "./requests.js";
const token = JSON.parse(localStorage.getItem("@petinfo:token"));
const modalPost = document.querySelector("#modalPostController");
const modalEdit = document.querySelector("#modalEditController");
const modalDel = document.querySelector("#modalDelController");
const modalFullPost = document.querySelector("#modalFullPostController");
let delID;
let editID;

// Preventing from feed without login

if(token == null){
    window.location.href = "/index.html";
}

// Logout

const profile_img = document.querySelector(".profile-dropdown a img");
const logout_div = document.querySelector(".logout-dropdown");
profile_img.addEventListener("click", () => {
    logout_div.classList.toggle("visible");
})

const logout = () => {
    const btn = document.querySelector("#logout-dropdown__btn");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/index.html";
    })
}

// Modal

const handleModal = (openButton, modal, closeButton) => {
    openButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.showModal();
        closeModal(closeButton, modal);
    });
}

const closeModal = (button, modal) => {
    button.addEventListener("click", (e) => {
        e.preventDefault;
        modal.close();
    })
}


logout();

// Render User

const renderUser = async () => {
    const user = await getUserProfile(token.token);
    const username = document.querySelector(".logout-dropdown__username");
    username.innerHTML = "@" + user.username;
    const img = document.querySelector(".profile-dropdown img");
    img.src = user.avatar;
}

await renderUser();

// Render Posts

const renderPosts = async () => {
    const user = await getUserProfile(token.token);
    const posts = await getPosts(token.token);
    const ul = document.querySelector(".main__section ul");
    ul.innerHTML = "";

    posts.forEach(post => {
        // Post "Header"
        const li = document.createElement("li");
        const headerdiv = document.createElement("div");
        const userdiv = document.createElement("div");
        const userimg = document.createElement("img");
        userimg.src = post.user.avatar;
        const username = document.createElement("p");
        username.innerHTML = post.user.username;
        username.classList.add("username");
        const barkey = document.createElement("p");
        barkey.innerHTML = "|";
        const postdate = document.createElement("p");
        const formattedDate = new Date(post.createdAt).toLocaleDateString();
        postdate.innerHTML = formattedDate;
        userdiv.append(userimg, username, barkey, postdate);
        userdiv.classList.add("post-header__info");

        const btndiv = document.createElement("div");
        const editbtn = document.createElement("button");
        editbtn.innerHTML = "Editar";
        editbtn.setAttribute("id", "btn-edit")
        editbtn.setAttribute("data-id", post.id);
        const delbtn = document.createElement("button");
        delbtn.innerHTML = "Excluir";
        delbtn.setAttribute("id", "btn-del");
        delbtn.setAttribute("data-id", post.id);
        btndiv.append(editbtn, delbtn);
        btndiv.classList.add("post-header__btns");

        if (user.id === post.user.id) {
            headerdiv.append(userdiv, btndiv);
        } else {
            headerdiv.append(userdiv);
        }
        headerdiv.classList.add("post-header");

        // Post "Main"

        const title = document.createElement("h4");
        title.innerHTML = post.title;
        const description = document.createElement("p");
        description.innerHTML = post.content;
        const link = document.createElement("a");
        link.innerHTML = "Acessar publicação";

        li.append(headerdiv, title, description, link);
        ul.append(li);
    });

    // Acess Full Post Modal

    const fullPost = document.querySelectorAll("li a");
    const fullPostExitBtn = document.querySelector("#exit-btn");
    fullPost.forEach(post => {
        post.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = document.querySelector("#modalFullPostContainer");
            modal.innerHTML = "";
            const clonedLi = post.parentElement.cloneNode(true);
            clonedLi.append(fullPostExitBtn);
            modal.appendChild(clonedLi);
        });
        handleModal(post, modalFullPost, fullPostExitBtn);
    })

    // Delete Post Modal

    const deleteBtns = document.querySelectorAll("#btn-del");
    const cancelBtn = document.querySelector("#btn-cancel2");
    deleteBtns.forEach(deleteBtn => {
        handleModal(deleteBtn, modalDel, cancelBtn);
        deleteBtn.addEventListener("click", () => delID = deleteBtn.getAttribute('data-id'));
    });

    // Edit Post Modal
    
    const editBtns = document.querySelectorAll("#btn-edit");
    const cancelBtn2 = document.querySelector("#btn-cancel3");
    editBtns.forEach(async (editBtn) => {
        const post = await getPost(token.token, editBtn.getAttribute('data-id'));
        handleModal(editBtn, modalEdit, cancelBtn2);
        editBtn.addEventListener("click", () => {
            const editTitle = document.querySelector("#edit-title");
            const editContent = document.querySelector("#edit-content");
            editTitle.value = post.title;
            editContent.value = post.content;
            editID = editBtn.getAttribute('data-id');
        });
    })
}

await renderPosts();

// Delete Post

const deleteBtn = document.querySelector("#btn-delete");
deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const deletingPost = deletePost(delID, token.token);
    if (deletingPost) {
        modalDel.close();
        await renderPosts();
    }
})

// Edit Post

const editBtn = document.querySelector("#btn-publish2");
const editTitle = document.querySelector("#edit-title");
const editContent = document.querySelector("#edit-content");

editBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
        title: editTitle.value,
        content: editContent.value
    }

    const editingPost = editPost(editID, token.token, data);
    if(editingPost) {
        modalEdit.close();
        await renderPosts();
    }
})

// Create a new post

const newPost = (input, textArea) => {
    const btn = document.querySelector("#btn-publish");
    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const data = { title: input.value, content: textArea.value };
        const post = await createPost(data, token.token);
        if (post) {
            modalPost.close();
            await renderPosts();
        }
    })
}

// Create a new post modal

const newPostModal = () => {
    const input = document.querySelector("#title");
    const textArea = document.querySelector("#content");
    const newPostBtn = document.querySelector(".header__div button");
    const cancelBtn = document.querySelector("#btn-cancel");
    newPostBtn.addEventListener("click", () => {
        input.value = "";
        textArea.value = "";
    })
    handleModal(newPostBtn, modalPost, cancelBtn);
    newPost(input, textArea);
}

newPostModal ();