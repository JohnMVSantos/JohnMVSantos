function sendMail(event) {
    event.preventDefault()

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_knmvu8h", "template_6itj2pa", params)
        .then(() => alert("Email Sent!"))
        .catch((error) => {
            console.error("Failed to send email:", error)
            alert("Unable to send email. Please try again.")
        })
}