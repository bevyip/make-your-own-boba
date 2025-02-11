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
      handleTabChange(button);
    });
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      handleTabChange(button);
    });
  });

  function handleTabChange(button) {
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
  }

  let selectedTea = "";
  let selectedMilk = "no-milk";
  let selectedTopping = "none";

  // Update the selected drink name
  function updateDrinkName() {
    let drinkName = "";

    // Add tea type and milk
    if (selectedTea === "jasmine") {
      drinkName = "Jasmine Green Tea";
    } else if (selectedTea === "thai") {
      drinkName = "Thai Iced Tea";
    } else if (selectedTea === "hongkong") {
      drinkName = "Hong Kong Tea";
    }

    if (selectedMilk === "lactose-free") {
      drinkName += " (Lactose-Free Milk)";
    } else if (selectedMilk === "oat") {
      drinkName += " (Oat Milk)";
    } else if (selectedMilk === "none") {
      drinkName += " (No Milk)";
    }

    // Add topping
    if (selectedTopping === "none") {
      drinkName += " with No Toppings";
    } else if (selectedTopping === "boba") {
      drinkName += " with Boba Pearls";
    } else if (selectedTopping === "star-jelly") {
      drinkName += " with Star Jelly";
    } else if (selectedTopping === "pudding") {
      drinkName += " with Caramel Pudding";
    }

    // Update the display
    document.getElementById("drink-name").innerText = drinkName;
  }

  // Update the name whenever the selection changes
  options.forEach((option) => {
    option.addEventListener("click", () => {
      handleOptionSelection(option);
      updateDrinkName(); // Update name after selection
    });
    option.addEventListener("touchstart", (e) => {
      e.preventDefault();
      handleOptionSelection(option);
      updateDrinkName(); // Update name after selection
    });
  });

  function handleOptionSelection(option) {
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
  }

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
