async function getDocument(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, "text/html");
    const contentDiv = htmlDoc.getElementById("content");
    const contentHtml = contentDiv.outerHTML;
    document.getElementById("content").innerHTML = contentDiv.innerHTML;
  } catch (error) {
    throw new Error("Could not fetch page.", { cause: error });
  }
}

function createLinkClickEvents(root) {
  const elements = root.querySelectorAll("a");
  console.log(elements);
  if (elements.length) {
    elements.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        getDocument(e.currentTarget.href);
      });
    });
  }
}

function ajax() {
  createLinkClickEvents(document);
}

document.addEventListener("DOMContentLoaded", ajax);
