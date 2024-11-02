let userInfo = document.getElementById("user_info");
let userData = document.getElementById("user");
let links = document.querySelector(".links");
let header = document.querySelector("header");
let logOutBtn = document.getElementById("logOut");
if (localStorage.getItem("username")) {
  links.remove();
  userInfo.style.display = "grid";
  userData.innerHTML = `welcome ${localStorage.getItem("username")}`;
}
logOutBtn.addEventListener("click", () => {
  // ["username", "password", "email"].forEach((item) =>
  //   localStorage.removeItem(item)
  // );
  localStorage.clear()
  setTimeout(() => {
    window.location="log-in.html";
  }, 1000);// Reload to reflect changes
});