let userInfo = document.getElementById("user_info");
let userData = document.getElementById("user");
let links = document.querySelector(".links");
let logOutBtn = document.getElementById("logOut");
let userDetail =document.querySelector(".user-detail")
let userDtBox =document.querySelector(".user")
let searcher =document.getElementById("searcher")
let searchBar = document.getElementById("searchBar");
if (localStorage.getItem("username")) {
  links.remove();
  userInfo.style.display = "flex";
  userData.innerHTML = `welcome ${localStorage.getItem("username")}`;
}
logOutBtn.addEventListener("click", () => {
  localStorage.clear()
  setTimeout(() => {
    window.location="log-in.html";
  }, 1000);// Reload to reflect changes
});
userDtBox.addEventListener("click", (event) => {
  userDetail.classList.toggle("showY");
  event.stopPropagation(); // Prevent click event from bubbling up to document
});
// Hide sideBar if clicking outside of it
document.addEventListener("click", (event) => {
  if (!userDetail.contains(event.target) && !userDtBox.contains(event.target)) {
    userDetail.classList.remove("showY"); // Hide sideBar if click is outside
  }
});
searcher.addEventListener("click", (event) => {
  searchBar.classList.toggle("showY");
  event.stopPropagation(); // Prevent click event from bubbling up to document
});
// Hide sideBar if clicking outside of it
document.addEventListener("click", (event) => {
  if (!searchBar.contains(event.target) && !searcher.contains(event.target)) {
    searchBar.classList.remove("showY"); // Hide sideBar if click is outside
  }
});

