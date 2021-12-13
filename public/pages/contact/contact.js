function sendContactMessage() {
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            name: document.getElementById("message").value,
        })
    }).then(response => {
        if (response.status === 200) {
            response.redirect("/contact")
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}


document.getElementById("contact-button").addEventListener("click", sendContactMessage);