import { fetchBlocklist, getBlocklist } from "./api";
import { createBlockButton } from "./components/button";
import { getPosts, getTopBar } from "./parser";

fetchBlocklist();

setInterval(() => {
  const blocklist: string[] = getBlocklist();
  // fetch posts
  // posts have data-pressable-container and data-interactive-id attribs.

  const posts: NodeListOf<HTMLDivElement> = getPosts();

  console.log("[Threads Blocker] Scanning posts");

  posts.forEach((post) => {
    if (post.hasAttribute("data-tb-scanned")) {
      // post has already been scanned
      return;
    }
    // add data-tb-scanned attribute to post
    post.setAttribute("data-tb-scanned", "true");

    const topBar: HTMLDivElement = getTopBar(post);

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
      const button = createBlockButton(username, post);
      topBar.firstChild?.firstChild?.appendChild(button);
    }
  });
}, 500);
