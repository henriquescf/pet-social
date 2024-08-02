import { loginRequest } from "./requests.js";

// Redirecionamento do botão "Cadastrar"

const register = () => {
    const btn = document.querySelector("#btn-register");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/src/pages/register.html"
    });
}

register();

// Pegar dados do usuário e logar

const userLogin = () => {
    const btn = document.querySelector("#btn-join");
    const inputs = document.querySelectorAll(".main-section__form input");
    const data = {};
    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        inputs.forEach(input => {
            data[input.name] = input.value;
        });
        await loginRequest(data);
    })
}

userLogin();