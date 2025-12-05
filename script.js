const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("selfiePreview");

// Turn on camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream);

// Capture selfie
document.getElementById("snap").addEventListener("click", () => {
  canvas.getContext("2d").drawImage(video, 0, 0, 300, 250);
  preview.src = canvas.toDataURL("image/png");
});

// Send selfie → get URL → generate QR
function sendData() {
  const image = canvas.toDataURL("image/png");

  fetch("https://script.google.com/macros/s/AKfycbwVrl2tw2WVLC1C4ZmxtWNHcZyieclI9MOycaeAVum1FIH_pnjFRwswy5_MBBdXnLXC/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image })
  })
  .then(() => {
    // We cannot read response due to no-cors
    // So generate QR using the link pattern of Google Drive
    document.getElementById("msg").innerText = 
      "QR will appear in 2 seconds...";

    setTimeout(() => {
      fetch("YOUR_WEBAPP_URL?latest=1")
        .then(r => r.text())
        .then(url => {
          const qrUrl = 
            `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;
          
          document.getElementById("qrCode").src = qrUrl;
        });
    }, 2000);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("msg").innerText = 
      "Error uploading selfie.";
  });
}
