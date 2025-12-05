const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("selfiePreview");
const qrBox = document.getElementById("qrCode");

// Turn on camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream);

// Capture selfie
document.getElementById("snap").addEventListener("click", () => {
  canvas.getContext("2d").drawImage(video, 0, 0, 300, 250);
  preview.src = canvas.toDataURL("image/png");
});

// Send selfie → Get URL → Generate QR
function sendData() {
  const image = canvas.toDataURL("image/png");

  fetch("https://script.google.com/macros/s/AKfycbwVrl2tw2WVLC1C4ZmxtWNHcZyieclI9MOycaeAVum1FIH_pnjFRwswy5_MBBdXnLXC/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image })
  })
  .then(res => res.json())
  .then(data => {
    const selfieUrl = data.imageUrl;

    // Generate QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(selfieUrl)}`;

    // Show QR in page
    document.getElementById("qrCode").src = qrUrl;

    document.getElementById("msg").innerText = "Scan this QR to view/download your selfie!";
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("msg").innerText = "Error uploading selfie.";
  });
}
