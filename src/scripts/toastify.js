// Toast

export const toast = (someText, location, icon, time = 5000) => {
    Toastify({
        text: someText,
        duration: time,
        avatar: icon,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#fefefe",
            border: "1px solid var(--primary-sucess-color)",
            "border-radius": "0.3125rem",
            width: "18.75rem",
            height: "8.125rem",
            color: "var(--primary-sucess-color)",
            "font-size": "0.8rem",
            display: "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "align-items": "center",
            gap: "1.25rem"

        },
        callback: function () {
            if(location != "null"){
                window.location.href = location;
            }
        },
    }).showToast();
}