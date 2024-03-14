let nickname = '';

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("1");
    nickname = document.getElementById("nickname").value;
    console.log(nickname);
    fetch("http://127.0.0.1:3000/chat");
  });
});

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("nickvar").innerHTML += `${nickname}`;
});

