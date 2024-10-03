let blocklist: string[] = [];

// Function to fetch the blocklist
async function fetchBlocklist() {
  try {
    const response = await fetch(
      "https://tb-worker.jtpotatodev.workers.dev/fetch"
    ); // Replace with the actual URL
    const data = await response.text();
    blocklist = data.split(" "); // Space-delimited string to array
  } catch (error) {
    console.error("Error fetching blocklist:", error);
  }
}

setInterval(() => {
  // fetch posts
  // posts have data-pressable-container and data-interactive-id attribs.

  const posts = document.querySelectorAll(
    'div[data-pressable-container="true"]'
  ) as NodeListOf<HTMLDivElement>;

  console.log("Scanning posts");

  posts.forEach((post) => {
    if (post.hasAttribute("data-tb-scanned")) {
      // post has already been scanned
      return;
    }
    // add data-tb-scanned attribute to post
    post.setAttribute("data-tb-scanned", "true");

    const topBar = post.childNodes[0].childNodes[1]
      .childNodes[0] as HTMLDivElement;

    if (topBar.tagName !== "DIV") {
      // this is not a top bar.
      return;
    }

    const username = topBar.innerText.split("\n")[0];

    if (blocklist.includes(username)) {
      console.log("Found a blocked user: ", username);
      const text = document.createElement("span");
      text.style.color = "var(--barcelona-secondary-text)";
      text.style.fontSize = "15px";
      text.innerText = "(on Universal Blocklist)";
      topBar.firstChild?.firstChild?.appendChild(text);
    } else {
      const button = document.createElement("button");
      button.style.display = "inline-block";
      button.style.marginLeft = "0.5em";
      button.style.fontSize = "15px";
      button.style.backgroundColor = "transparent";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-gavel"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" /><path d="M6 9l4 4" /><path d="M13 10l-4 -4" /><path d="M3 21h7" /><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" /></svg>`;
      button.title = "Add to Universal Blocklist";

      button.addEventListener("click", () => {
        // add username to blocklist
        fetch("https://tb-worker.jtpotatodev.workers.dev/add", {
          method: "POST",
          body: JSON.stringify({ username: username }),
        });

        // remove post from page
        post.remove();
      });

      // insert as last child of the first child of the topBar
      topBar.firstChild?.firstChild?.appendChild(button);
    }
  });
}, 500);

fetchBlocklist();

console.log(blocklist);
