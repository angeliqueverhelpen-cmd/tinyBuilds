let cookieConsent = document.getElementById("cookie-consent");
let acceptCookies = document.getElementById("accept-cookies");
let declineCookies = document.getElementById("decline-cookies");

acceptCookies.addEventListener("click", function () {
  cookieConsent.style.display = "none";
});

declineCookies.addEventListener("click", function () {
  cookieConsent.style.display = "none";
});
