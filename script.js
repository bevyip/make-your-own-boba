document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".option");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const popupMessage = document.getElementById("popup-message");
  const closePopupButton = document.getElementById("close-popup");

  tabContents.forEach((tab) => tab.classList.remove("active"));
  document.getElementById("tea-options").classList.add("active");

  tabButtons[0].classList.add("active");
  tabButtons[0].style.backgroundColor = "#C9839B";
  tabButtons[0].style.borderColor = "#566076";

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentActiveButton = document.querySelector(".tab-button.active");
      currentActiveButton.classList.remove("active");
      currentActiveButton.style.backgroundColor = "";
      currentActiveButton.style.borderColor = "";

      document.querySelector(".tab-content.active").classList.remove("active");

      button.classList.add("active");
      button.style.backgroundColor = "#C9839B";
      button.style.borderColor = "#566076";

      document
        .getElementById(button.getAttribute("data-tab"))
        .classList.add("active");
    });
  });

  let selectedTea = "";
  let selectedMilk = "no-milk";
  let selectedTopping = "none";

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const type = option.getAttribute("data-type");
      const value = option.getAttribute("data-value");

      options.forEach((opt) => {
        if (opt.getAttribute("data-type") === type) {
          opt.classList.remove("selected");
        }
      });

      if (type === "tea") {
        selectedTea = value;
        option.classList.add("selected");
        updateDrinkImage();
      } else if (type === "milk") {
        if (!selectedTea) {
          popupMessage.style.display = "flex";
          return;
        }
        option.classList.add("selected");
        selectedMilk = value;
        updateDrinkImage();
      } else if (type === "topping") {
        option.classList.add("selected");
        selectedTopping = value;
        updateToppingOverlay();
      }
    });
  });

  closePopupButton.addEventListener("click", () => {
    popupMessage.style.display = "none";
  });

  function updateDrinkImage() {
    let teaFilename = selectedTea
      ? getTeaFilename(selectedTea, selectedMilk)
      : "empty-cup";
    document.getElementById(
      "drink-base"
    ).src = `img/variants/${teaFilename}.png`;
  }

  function updateToppingOverlay() {
    const toppingImg = document.getElementById("topping-overlay");

    if (selectedTopping === "none") {
      toppingImg.style.display = "none";
      toppingImg.src = "";
    } else {
      toppingImg.style.display = "block";
      toppingImg.src = `img/toppings/${selectedTopping}.png`;
    }
  }

  function getTeaFilename(tea, milk) {
    let milkSuffix =
      {
        "no-milk": "no-milk",
        "lactose-free": "with-milk",
        oat: "with-oat-milk",
      }[milk] || "no-milk";

    let teaMapping = {
      jasmine: "green-tea",
      hongkong: "hongkong",
      thai: "thai-tea",
    };

    return `${teaMapping[tea]}-${milkSuffix}`;
  }
});
