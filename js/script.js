const questionToggles = document.querySelectorAll(".question__toggle");

questionToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("open")) {
      toggleOffSingle(toggle);
      return;
    }

    toggleOffOthers(toggle);
    toggleOn(toggle);
  });
});

questionToggles.forEach((toggle, index) => {
  toggle.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusNext(index);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusPrevious(index);
        break;
      case "Home":
        e.preventDefault();
        questionToggles[0].focus();
        break;
      case "End":
        e.preventDefault();
        questionToggles[questionToggles.length - 1].focus();
        break;
    }
  });
});

function toggleOff(toggle, panel) {
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");

  panel.style.height = "";
  panel.addEventListener(
    "transitionend",
    () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    },
    { once: true },
  );
}

function toggleOffOthers(toggleException) {
  questionToggles.forEach((toggle) => {
    if (toggle === toggleException) {
      return;
    }

    const panel = getAdjacentPanel(toggle);
    if (toggle.classList.contains("open")) {
      toggleOff(toggle, panel);
    }
  });
}

function toggleOffSingle(toggle) {
  toggleOff(toggle, getAdjacentPanel(toggle));
}

function toggleOn(toggle) {
  toggle.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");

  const panel = getAdjacentPanel(toggle);
  panel.classList.add("open");
  panel.style.height = panel.scrollHeight + "px";
  panel.setAttribute("aria-hidden", "false");
}

function getAdjacentPanel(toggle) {
  return document.getElementById(toggle.getAttribute("aria-controls"));
}

function focusNext(index) {
  const nextIndex = (index + 1) % questionToggles.length;

  questionToggles[nextIndex].focus();
}

function focusPrevious(index) {
  const prevIndex =
    (index - 1 + questionToggles.length) % questionToggles.length;
  questionToggles[prevIndex].focus();
}
