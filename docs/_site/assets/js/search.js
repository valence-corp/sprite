import data from "/sprite/assets/js/searchData.js";
import serializedIndex from "./serialized.js";
//import lunr from "lunr"; // assuming lunr is a separate module

// Constants
const MIN_SEARCH_LENGTH = 3;

// State definition
const state = {
  filters: {
    class: true,
    method: true,
    type: true,
  },
  results: {
    filtered: [],
    full: [],
  },
  visible: false,
};

// Elements for reference
const elements = {
  input: null,
  resultsBox: null,
  resultList: null,
  numberOfResults: null,
  numberResultsShowing: null,
  backdrop: null,
  filters: null,
  searchLabel: null,
  close: null,
};

// Initialize search
async function initializeSearch() {
  const root = document.getElementById("searchBox");
  elements.input = root.querySelector("#searchInput");
  elements.resultsBox = root.querySelector("#searchResultsBox");
  elements.resultList = root.querySelector("#resultList");
  elements.numberOfResults = root.querySelector("#numberOfResults");
  elements.numberResultsShowing = root.querySelector("#numberResultsShowing");
  elements.filters = root
    .querySelector("#searchFilters")
    .getElementsByTagName("input");
  elements.searchLabel = root.querySelector("#searchLabel");
  elements.close = root.querySelector("#searchClose");

  // Load the index
  const index = lunr.Index.load(serializedIndex);

  // Initialize search filter toggles
  for (let i = 0; i < elements.filters.length; ++i) {
    elements.filters[i].addEventListener("change", () => {
      state.filters[elements.filters[i].value] = elements.filters[i].checked;
      updateResultList();
    });
  }

  // Add event listeners
  elements.input.addEventListener("input", search);
  elements.close.addEventListener("click", hideSearchBox);

  // Define functions
  function appendBackdrop() {
    elements.backdrop = document.createElement("div");
    elements.backdrop.id = "backdrop";
    elements.backdrop.addEventListener("click", hideSearchBox);
    root.appendChild(elements.backdrop);
  }

  function removeBackdrop() {
    elements.backdrop.removeEventListener("click", appendBackdrop);
    elements.backdrop.remove();
    elements.backdrop = undefined;
  }

  function handleKeyboardSelection() {
    const items = elements.list.querySelectorAll("a");
    if (items.length > 0) {
      if (document.activeElement === elements.input) {
        e.preventDefault();
        items[0].focus();
      } else {
        for (let i = 0; i < results.length; i++) {
          if (items[i] === document.activeElement) {
            e.preventDefault();
            if (i + 1 < items.length) {
              items[i + 1].focus();
            } else {
              elements.input.focus();
            }
            break;
          }
        }
      }
    }
  }

  function checkKeyPress(e) {
    if (e.key === "Tab") {
      handleKeyboardSelection(e);
    }
    if (e.key === "Escape") {
      hideSearchBox();
    }
  }

  function showResultsBox() {
    appendBackdrop();
    state.visible = true;
    elements.resultsBox.classList.remove("hidden");
    document.addEventListener("keydown", checkKeyPress);
  }

  function hideSearchBox() {
    state.visible = false;
    elements.resultsBox.classList.add("hidden");
    document.removeEventListener("keydown", checkKeyPress);
    removeBackdrop();
  }

  function updateResultList() {
    state.results.filtered = [];
    elements.resultList.innerHTML = "";
    elements.numberOfResults.innerHTML = state.results.full.length;
    elements.numberResultsShowing.innerHTML = state.results.filtered.length;

    if (state.results.full.length > 0) {
      state.results.full.forEach((result) => {
        const doc = data.find((doc) => doc.name === result.ref);
        const type = doc.type === "interface" ? "type" : doc.type;
        if (state.filters[type]) {
          state.results.filtered.push(result.ref);
          const section = document.createElement("section");
          const desc = document.createElement("p");
          const link = document.createElement("a");
          const li = document.createElement("li");

          li.className = doc.type;

          link.href = `/sprite/doc/${doc.name}`;
          link.className = "searchResultLink";
          link.addEventListener("click", () => {});
          link.textContent = doc.parent
            ? `${doc.parent}.${doc.name}`
            : doc.name;

          desc.textContent = doc.desc;

          section.appendChild(link);
          section.appendChild(desc);

          li.appendChild(section);

          elements.resultList.appendChild(li);
        }
      });

      elements.numberResultsShowing.innerHTML = state.results.filtered.length;
    }
  }

  function displayResults() {
    if (!state.visible) {
      showResultsBox();
    }
    updateResultList();
  }

  function search() {
    if (elements.input.value.length > 0) {
      elements.searchLabel.classList.add("hidden");
    } else {
      elements.searchLabel.classList.remove("hidden");
    }

    if (elements.input.value.length >= MIN_SEARCH_LENGTH) {
      const initial = index.search(elements.input.value);

      if (initial.length === 0) {
        const wildcardResults = index.search(`${elements.input.value}*`);
        state.results.full =
          wildcardResults.length > 0
            ? wildcardResults
            : index.search(`*${elements.input.value}*`);
      } else {
        state.results.full = initial;
      }

      displayResults();
    }
  }
}

document.addEventListener("DOMContentLoaded", initializeSearch);

// import data from "/sprite/assets/js/searchData.js";
// import serializedIndex from "./serialized.js";

// async function initializeSearch() {
//   const config = {
//     minSearchLength: 3,
//     indexedFields: ["name", "desc", "type", "parent"],
//   };

//   // Build the index using Lunr.js
//   const index = lunr.Index.load(serializedIndex);

//   // Define the root element
//   const root = document.getElementById("searchBox");

//   // State definition
//   const state = {
//     filters: {
//       class: true,
//       method: true,
//       type: true,
//     },
//     results: {
//       filtered: [],
//       full: [],
//     },
//     visible: false,
//   };

//   // Elements for reference
//   const el = {
//     input: root.querySelector("#searchInput"),
//     results: root.querySelector("#searchResultsBox"),
//     list: root.querySelector("#resultList"),
//     numberOfResults: root.querySelector("#numberOfResults"),
//     numberResultsShowing: root.querySelector("#numberResultsShowing"),
//     backdrop: undefined,
//     filters: root.querySelector("#searchFilters").getElementsByTagName("input"),
//     searchLabel: root.querySelector("#searchLabel"),
//     close: root.querySelector("#searchClose"),
//   };

//   // Initialize search filter toggles
//   for (let i = 0; i < el.filters.length; ++i) {
//     el.filters[i].addEventListener("change", () => {
//       state.filters[el.filters[i].value] = el.filters[i].checked;
//       updateResultList();
//     });
//   }

//   function appendBackdrop() {
//     el.backdrop = document.createElement("div");
//     el.backdrop.id = "backdrop";
//     el.backdrop.addEventListener("click", hideSearchBox);
//     root.appendChild(el.backdrop);
//   }

//   function removeBackdrop() {
//     el.backdrop.removeEventListener("click", appendBackdrop);
//     el.backdrop.remove();
//     el.backdrop = undefined;
//   }

//   function handleKeyboardSelection() {
//     const items = el.list.querySelectorAll("a");
//     if (items.length > 0) {
//       if (document.activeElement === el.input) {
//         e.preventDefault();
//         items[0].focus();
//       } else {
//         for (let i = 0; i < results.length; i++) {
//           if (items[i] === document.activeElement) {
//             e.preventDefault();
//             if (i + 1 < items.length) {
//               items[i + 1].focus();
//             } else {
//               el.input.focus();
//             }
//             break;
//           }
//         }
//       }
//     }
//   }

//   function checkKeyPress(e) {
//     if (e.key === "Tab") {
//       handleKeyboardSelection();
//     }
//     if (e.key === "Escape") {
//       hideSearchBox();
//     }
//   }

//   function showResultsBox() {
//     appendBackdrop();
//     state.visible = true;
//     el.results.classList.remove("hidden");
//     document.addEventListener("keydown", checkKeyPress);
//   }

//   function hideSearchBox() {
//     state.visible = false;
//     el.results.classList.add("hidden");
//     document.removeEventListener("keydown", showResultsBox);
//     removeBackdrop();
//   }

//   function updateResultList() {
//     state.results.filtered = [];
//     el.list.innerHTML = "";
//     el.numberOfResults.innerHTML = state.results.full.length;
//     el.numberResultsShowing.innerHTML = state.results.filtered.length;

//     if (state.results.full.length > 0) {
//       state.results.full.forEach((result) => {
//         // TODO: should look into this, is it necessary to find
//         // the original document?
//         const doc = data.find((doc) => doc.name === result.ref);
//         const type = doc.type === "interface" ? "type" : doc.type;
//         if (state.filters[type]) {
//           state.results.filtered.push(result.ref);
//           const section = document.createElement("section");
//           const desc = document.createElement("p");
//           const link = document.createElement("a");
//           const li = document.createElement("li");

//           li.className = doc.type;

//           link.href = `/sprite/doc/${doc.name}`;
//           link.className = "searchResultLink";
//           link.addEventListener("click", () => {});
//           link.textContent = doc.parent
//             ? `${doc.parent}.${doc.name}`
//             : doc.name;

//           desc.textContent = doc.desc;

//           section.appendChild(link);
//           section.appendChild(desc);

//           li.appendChild(section);

//           el.list.appendChild(li);
//         }
//       });

//       el.numberResultsShowing.innerHTML = state.results.filtered.length;
//     }
//   }

//   function displayResults() {
//     if (!state.visible) {
//       showResultsBox();
//     }
//     updateResultList();
//   }

//   // search the index
//   function search() {
//     // Hide the "Search" Label
//     // (which functions as a placeholder)
//     if (el.input.value.length > 0) {
//       el.searchLabel.classList.add("hidden");
//     } else {
//       el.searchLabel.classList.remove("hidden");
//     }

//     // run a search if the search term is longer than
//     // the minimum set in the config
//     if (el.input.value.length >= config.minSearchLength) {
//       const initial = index.search(searchInput.value);

//       // if there are no results, try again with a wildcard,
//       // and then yet again with two wildcards
//       if (initial.length === 0) {
//         const wildcardResults = index.search(`${searchInput.value}*`);
//         state.results.full =
//           wildcardResults.length > 0
//             ? wildcardResults
//             : index.search(`*${searchInput.value}*`);
//       } else {
//         state.results.full = initial;
//       }

//       displayResults();
//     }
//   }

//   el.input.addEventListener("input", search);
//   el.close.addEventListener("click", hideSearchBox);
// }

// document.addEventListener("DOMContentLoaded", initializeSearch);
