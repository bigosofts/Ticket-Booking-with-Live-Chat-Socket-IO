var nexusratio = 0.5628415300546448;

// Function to resize the Nexus 6P
function resize() {
  var h = document.documentElement.clientHeight || window.innerHeight;
  var w = document.documentElement.clientWidth || window.innerWidth;

  console.log(h);

  if (h > 512) {
    document.getElementById("nexus6p").style.height = "512px";
    document.getElementById("nexus6p").style.width = 512 * nexusratio + "px";
  } else {
    var calculatedWidth = h * nexusratio;
    document.getElementById("nexus6p").style.height = h + "px";
    document.getElementById("nexus6p").style.width = calculatedWidth + "px";
  }
}

// Add click event listener to the menu button
document.querySelector(".menu").addEventListener("click", function () {
  this.classList.toggle("on");
});

// Add click event listeners to menu items
var menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function () {
    // Remove "open" class from all profile containers
    var profileContainers = document.querySelectorAll(".profile-bottom .profile-container");
    profileContainers.forEach(function (container) {
      container.classList.remove("open");
    });

    var dataAttr = this.getAttribute("menu-data");
    console.log(dataAttr);

    // Add "open" class to the selected profile container
    var selectedContainer = document.querySelector("." + dataAttr);
    if (selectedContainer) {
      selectedContainer.classList.add("open");
    }
  });
});

// Call the resize function when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  resize();
});

// Call the resize function when the window is resized
window.addEventListener("resize", function () {
  resize();
});
