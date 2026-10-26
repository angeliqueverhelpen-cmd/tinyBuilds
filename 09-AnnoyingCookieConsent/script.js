const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalChoiceBtns = document.getElementById("modal-choice-btns");
const declineBtn = document.getElementById("decline-btn");
const consentForm = document.getElementById("consent-form");
const modalText = document.getElementById("modal-text");
const modalInner = document.getElementById("modal-inner");
const consentKey = "cookie-consent";

function hideModal() {
  modal.style.display = "none";
}

function saveConsent(choice) {
  localStorage.setItem(consentKey, choice);
  hideModal();
}

function showModal() {
  modal.style.display = "block";
}

if (!localStorage.getItem(consentKey)) {
  showModal();
} else {
  hideModal();
}

modalCloseBtn.addEventListener("click", function () {
  saveConsent("dismissed");
});

declineBtn.addEventListener("mouseenter", function () {
  modalChoiceBtns.classList.toggle("modal-btns-reverse");
});

declineBtn.addEventListener("click", function () {
  saveConsent("declined");
});

consentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const consentFormData = new FormData(consentForm);
  const fullName = consentFormData.get("fullName");

  localStorage.setItem(consentKey, "accepted");

  modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>`;

  setTimeout(function () {
    document.getElementById("upload-text").innerText = "Making the sale...";
  }, 1500);

  setTimeout(function () {
    modalInner.innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `;
    modalCloseBtn.disabled = false;
  }, 3000);
});
