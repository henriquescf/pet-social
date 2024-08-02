import { toast } from "./toastify.js";

const baseURL = "http://localhost:3333";
let token = "";

// LOGIN REQUEST

export const loginRequest = async (data) => {
    const login = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            const p = document.querySelector(".invisible");
            p.classList.toggle("visible");
            setTimeout(function () { p.classList.toggle("visible") }, 3500)
        }
    })

    token = login;

    if (token != null) {
        localStorage.setItem("@petinfo:token", JSON.stringify(token));
        window.location.href = "/src/pages/feed.html"
    }

    return login;
}

// REGISTER REQUEST

export const registerRequest = async (data) => {
    const register = await fetch(`${baseURL}/users/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            toast(`Sua conta foi criada com sucesso! Você será redirecionado para página de login.`, "/index.html", "/src/assets/img/check.svg", 2500);
            return res.json()
        } else {
            toast(`Ops, algo deu errado, tente novamente.`, "null", "/src/assets/img/red-cross.svg");
        }
    })

    return register;
}

// GET USER PROFILE

export const getUserProfile = async(acessToken) => {
    const user = await fetch(`${baseURL}/users/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${acessToken}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })

    return user;
}

// GET ALL POSTS

export const getPosts = async (acessToken) => {
    const posts = await fetch(`${baseURL}/posts`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${acessToken}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })

    return posts;
}

// GET A POST BY ID

export const getPost = async (acessToken, id) => {
    const post = await fetch(`${baseURL}/posts/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${acessToken}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })

    return post;
}

// CREATE POST

export const createPost = async (data, token) => {
    const post = await fetch(`${baseURL}/posts/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            toast(`Postado com sucesso.`, "null", "/src/assets/img/check.svg", 2500);
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })

    return post;
}

// DELETE POST

export const deletePost = async (id, token) => {
    const deletedPost = await fetch(`${baseURL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(res => {
        if (res.ok) {
            toast(`Post deletado com sucesso.`, "null", "/src/assets/img/check.svg", 2500);
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })
    return deletedPost;
}

// EDIT POST

export const editPost = async (id, token, data) => {
    const editedPost = await fetch(`${baseURL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            toast(`Post editado com sucesso.`, "null", "/src/assets/img/check.svg", 2500);
            return res.json()
        } else {
            throw new Error("Ops, algo deu errado.")
        }
    }).catch(err => {
        console.log(err.message)
    })
    return editedPost;
}