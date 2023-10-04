// Get the reference to the install button element from the DOM
const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
// Prevent the default browser prompt for installing the PWA
  event.preventDefault();
  deferredPrompt = event; 
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
// Event listener for the click event on the install button
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      console.log("PWA installation accepted");
    } else {
      console.log("PWA installation rejected");
    }
// Reset the deferred prompt and hide the install button
    deferredPrompt = null;
    butInstall.style.display = "none";
  }
});

// TODO: Add an handler for the `appinstalled` event
// Event listener for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("PWA installed successfully");
});