const countdown = () => {
    const eventDate = new Date("November 4, 2024 00:00:00 GMT-3").getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
};

setInterval(countdown, 1000);

const API_KEY = process.env.API_KEY;

document.getElementById("subscriptionForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": API_KEY
            },
            body: JSON.stringify({
                email: email,
                listIds: [123],
                updateEnabled: true
            })
        });

        if (response.ok) {
            alert("¡Gracias por suscribirte!");
            event.target.reset(); 
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.message || "No se pudo completar la suscripción.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un problema al procesar la solicitud.");
    }
});