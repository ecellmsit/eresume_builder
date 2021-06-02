const hamburger = document.querySelector(".square");

const nav = document.querySelector(".nav-list");
const square = document.querySelector(".square");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");


hamburger.addEventListener("click", () => {
    nav.classList.toggle("slide");
    square.classList.toggle("square");
    square.style.opacity = 0;
    square.classList.toggle("plus");
    line1.classList.toggle("line1");
    line1.classList.toggle("dash");
    line2.classList.toggle("line2");
    line2.classList.toggle("slash");
    line3.classList.toggle("d-n");
    square.style.opacity = 1;
    square.classList.toggle("rotate");
});
