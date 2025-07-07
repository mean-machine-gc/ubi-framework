document.addEventListener("DOMContentLoaded", function() {
    const tocContainer = document.querySelector(".toc");
    if (!tocContainer) return;

    const headers = document.querySelectorAll("article h2, article h3, article h4");
    if (headers.length === 0) return;

    let tocHTML = "<ul>";
    let lastLevel = 2;

    headers.forEach(header => {
        const level = parseInt(header.tagName.substring(1));
        const title = header.textContent;
        const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        header.id = id;

        if (level > lastLevel) {
            tocHTML += "<ul>".repeat(level - lastLevel);
        } else if (level < lastLevel) {
            tocHTML += "</ul>".repeat(lastLevel - level);
        }

        tocHTML += `<li><a href="#${id}">${title}</a></li>`;
        lastLevel = level;
    });

    tocHTML += "</ul>".repeat(lastLevel - 1);
    tocContainer.innerHTML = tocHTML;
});