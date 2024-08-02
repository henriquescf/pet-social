import { registerRequest } from "./requests.js";

// Redirecionamento do botão "Voltar para o login"

const backToLogin = () => {
    const btn = document.querySelector("#btn-back");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/index.html"
    });
}

backToLogin();

// Pegar dados do usuário e cadastrar

const userRegister = () => {
    const btn = document.querySelector("#btn-register");
    const inputs = document.querySelectorAll(".main-section__form input");
    const data = {};
    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        if(data.avatar === ""){
            data.avatar = "https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Isolated-Background.png";
        }
        
        await registerRequest(data);
    })
}

userRegister();