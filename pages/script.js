const navId = document.getElementById("nav_menu"),
    ToggleBtnId = document.getElementById("toggle_btn"),
    ClosedBtnId = document.getElementById("close_btn");

/ show menu/
ToggleBtnId.addEventListener("click", () => {
    navId.classList.add("show");
});

/Hide Menu/

ClosedBtnId.addEventListener("click", () => {
    navId.classList.remove("show");
});


// Animations on scroll 
AOS.init();
// GSAP Animations
// Logo 
gsap.from(".logo", {
    opacity: 0,
    y: -10,
    delay: 1,
    duration: 0.5
});

// Menu
gsap.from(".nav_menu_list .nav_menu_item", {
    opacity: 0,
    y: -10,
    delay: 1,
    duration: 0.5,
    stagger: 0.3
});

// Toggle btn

gsap.from(".toggle_btn", {
    opacity: 0,
    y: -10,
    delay: 1.4,
    duration: 0.5,
    stagger: 0.3
});

// main heading 
gsap.from(".main-heading", {
    opacity: 0,
    y: 20,
    delay: 2.4,
    duration: 1
});

// Text info
gsap.from(".info-text", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
});

// Submit button
gsap.from(".btn-wrapper", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
});

// Image
gsap.from(".team_img_wrapper img", {
    opacity: 0,
    y: 20,
    delay: 3,
    duration: 1,
});
