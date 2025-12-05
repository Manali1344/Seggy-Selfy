const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("selfiePreview");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream);

document.getElementById("snap").addEventListener("click", () => {
  canvas.getContext("2d").drawImage(video, 0, 0, 300, 250);
  preview.src = canvas.toDataURL("image/png");
});

function sendData() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const image = canvas.toDataURL("image/png");

  fetch("https://script.google.com/macros/s/AKfycbwVrl2tw2WVLC1C4ZmxtWNHcZyieclI9MOycaeAVum1FIH_pnjFRwswy5_MBBdXnLXC/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, phone, image })
  });

  document.getElementById("msg").innerText = "Selfie Sent!";
}
