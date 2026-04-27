function toggleMenu() {
    const nav = document.getElementById("navMenu");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

function filterProducts(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function sendToWhatsApp(productName) {
    const phoneNumber = "254723117400"; // replace with your WhatsApp number

    const message = `Hello Everlast, I'm interested in the ${productName}. Please share more details.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

function openWhatsAppGeneral() {
    const phoneNumber = "254723117400";

    const message = "Hello Everlast, I would like to inquire about your weighing solutions.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

let currentProduct = "";

function openModal(element) {

    const name = element.dataset.name;
    const specs = element.dataset.specs;
    const description = element.dataset.description;

    currentProduct = name;

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalSpecs").innerText = specs;
    document.getElementById("modalDescription").innerText = description;

    document.getElementById("productModal").style.display = "block";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// WhatsApp from Modal
document.getElementById("modalBtn").onclick = function () {
    sendToWhatsApp(currentProduct);
};

function submitQuote() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const details = document.getElementById("details").value;

    if (!name || !phone) {
        alert("Please fill in required fields");
        return;
    }

    const leadId = "EV-" + Date.now();
    const timestamp = new Date().toLocaleString();

    const quote = {
        id: leadId,
        product: currentProduct,
        name: name,
        phone: phone,
        email: email,
        details: details,
        time: timestamp
    };

    // Save locally
    let quotes = JSON.parse(localStorage.getItem("everlast_quotes")) || [];
    quotes.push(quote);
    localStorage.setItem("everlast_quotes", JSON.stringify(quotes));

    // ALSO send to WhatsApp (very powerful combo)
    const phoneNumber = "254723117400";

    const message = `Hello Everlast,

QUOTE REQUEST

Name: ${name}
Phone: ${phone}
Email: ${email}

Product: ${currentProduct}

Details: ${details}

Quote ID: ${leadId}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = url;
}
