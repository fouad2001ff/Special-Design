// Click On Toggle-Settings gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// check color LocalStorage
let colorOption = localStorage.getItem("color-option");
if (colorOption !== null) {
  document.documentElement.style.setProperty("--main-color", colorOption);

  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.color === colorOption) {
      ele.classList.add("active");
    }
  });
}

// Switch Color
document.querySelectorAll(".colors-list li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Add color-option to localStorage
    localStorage.setItem("color-option", e.target.dataset.color);

    // Remove active class and add on the clicked
    handleActive(e);
  });
});

// check Background LocalStorage
let backgroundOption = true;
let backgroundInterval;
let backgroundOptionItem = localStorage.getItem("background-option");
if (backgroundOptionItem !== null) {
  document.querySelectorAll(".bgbuttons span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundOptionItem === "true") {
    document.querySelector(".bgbuttons .yes").classList.add("active");
  } else {
    document.querySelector(".bgbuttons .no").classList.add("active");
  }

  if (backgroundOptionItem === "true") {
    backgroundOption === true;
  } else {
    backgroundOption === false;
  }
}

// Change Random Background
document.querySelectorAll(".bgbuttons span").forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});

// Reset option button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();

  location.reload();
};
// Start Landing Page

// function to random background

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let landpage = document.querySelector(".landing-page");

      let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

      let randomNum = Math.floor(Math.random() * imgsArray.length);

      landpage.style.backgroundImage =
        ' url("imgs/' + imgsArray[randomNum] + '") ';
    }, 8000);
  }
}

randomizeImgs();
// End Landing Page

// Select Skill Selector
let ourSkill = document.querySelector(".our_skills");

window.onscroll = function () {
  let skillOffsetTop = ourSkill.offsetTop;

  let skillOuterHeight = ourSkill.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;
  console.log(windowScrollTop);

  if (
    windowScrollTop >
    skillOffsetTop + skillOuterHeight / 1.3 - windowHeight
  ) {
    let spans = document.querySelectorAll(".skill_box .skill_progress span");

    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// Select imgs and create popup-box
let imgs = document.querySelectorAll(".images-box img");

imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay div
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // create popup-box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    overlay.appendChild(popupBox);

    // Create the Image
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    // Create close Button
    let closeButton = document.createElement("div");
    closeButton.appendChild(document.createTextNode("X"));
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// Close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToSections(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSections(allBullets);
scrollToSections(allLinks);

// Handle active state
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

//  Show bullet options

let optionSpans = document.querySelectorAll(".bullbuttons span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullet-option");

if (bulletLocalStorage !== null) {
  optionSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullbuttons .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullbuttons .no").classList.add("active");
  }
}

optionSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (span.dataset.display === "block") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullet-option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullet-option", "none");
    }
  });
});

// Toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleMenu.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== theLinks) {
    if (theLinks.classList.contains("open")) {
      theLinks.classList.remove("open");
      toggleMenu.classList.remove("menu-active");
    }
  }
});

theLinks.onclick = function (e) {
  e.stopPropagation();
};
