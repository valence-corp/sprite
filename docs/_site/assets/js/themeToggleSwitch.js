// function setTheme(theme) {
//   localStorage.setItem("theme", theme);
//   document.body.className = theme;
// }

// function setSwitchPosition(theme) {
//   switch (theme) {
//     case "dark":
//       themeToggleSwitch.checked = true;
//       break;
//     case "light":
//       themeToggleSwitch.checked = false;
//       break;
//     default:
//       throw new Error("unknow theme");
//   }
// }

// function setThemeAndSwitch(theme) {
//   setTheme(theme);
//   setSwitchPosition(theme);
// }

// function prefersTheme(theme) {
//   return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches();
// }

// function initializeThemeToggle() {
//   const theme = localStorage.getItem("theme");
//   const toggleSwitch = document.getElementById("themeToggle");

//   toggleSwitch.addEventListener("click", () => {
//     if (themeToggleSwitch.checked) {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   });

//   if (theme) {
//     setThemeAndSwitch(theme);
//   } else {
//     if (prefersTheme("dark")) {
//       setThemeAndSwitch("dark");
//       return;
//     } else {
//       setThemeAndSwitch("light");
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", initializeThemeToggle);

class ThemeController {
  constructor(target) {
    this.element = target;
    this.theme = localStorage.getItem("theme");
    this.initialize();
  }
  initialize = () => {
    this.element.addEventListener("click", () => {
      if (this.element.checked) {
        this.changeTheme("dark");
      } else {
        this.changeTheme("light");
      }
    });
    this.determineInitialPosition();
  };
  prefersTheme = (theme) => {
    return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches();
  };
  determineInitialPosition = () => {
    if (this.theme) {
      this.setTheme(this.theme);
    } else {
      if (prefersTheme("dark")) {
        this.setTheme("dark");
        return;
      } else {
        this.setTheme("light");
      }
    }
  };
  setPosition = (theme) => {
    switch (theme) {
      case "dark":
        this.element.checked = true;
        break;
      case "light":
        this.element.checked = false;
        break;
      default:
        throw new Error("unknow theme");
    }
  };
  changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  };
  setTheme = (theme) => {
    this.changeTheme(theme);
    this.setPosition(theme);
  };
}

function initializeThemeToggle() {
  const element = document.getElementById("themeToggle");
  return new ThemeController(element);
}

document.addEventListener("DOMContentLoaded", initializeThemeToggle);
