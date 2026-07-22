let scriptUrl = "https://script.google.com/macros/s/AKfycbwcL0ux4L3V1HvWAFTnsL0VXdxpklnQ56HShS9bwmqUE84TqQH4R81pWcn-Il4LUxTuQw/exec"

let form = document.getElementById("form-contact")

form.onsubmit = function (e) {

    fetch(scriptUrl, {
        method: "POST",
        body: new FormData(form),
    })
    .then(function (response) {
        setTimeout(() => {
            localStorage.removeItem("cart")
            window.location.reload()
        }, 3000);
    })
    .catch(function (error) {
        return console.error("error!", error.message)
    })
}