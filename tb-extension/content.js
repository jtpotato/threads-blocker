// content.js

let blocklist = [];

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

// Function to check posts for blocked usernames
function checkPosts() {
  const timelineSelector = document.evaluate(
    '//*[@id="barcelona-page-layout"]/div/div/div[2]/div[1]/div[3]/div/div[1]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  const timeline = timelineSelector.snapshotItem(0);

  if (!timeline) {
    return;
  }

  for (let i = 0; i < timeline.children.length; i++) {
    // select children 4 layers deep
    /** @type {HTMLDivElement} */
    const post =
      timeline.children[i].children[0].children[0].children[0].children[0];
    console.log(post);
    /** @type {string} */
    const username =
      post.children[1].children[0].children[0].children[0].children[0]
        .innerText; // this is so painful

    console.log("Username", username);
    console.log("Blocklist", blocklist);

    if (blocklist.includes(username)) {
      // if the username is blocked, show a message.
      post.children[2].children[0].children[0].insertAdjacentHTML(
        "beforebegin",
        "<span style='color:var(--barcelona-secondary-text); font-weight:bold;'>User is on universal blocklist.</span>"
      );
    }
  }
}

console.log("[Threads Blocker] Active");

// Initial fetch of the blocklist
fetchBlocklist();

setTimeout(() => {
  checkPosts();
}, 1000);

// // Poll the timeline every 5-10 seconds
// setInterval(() => {
//   checkPosts();
// }, 5000); // Adjust time as needed (5000 ms = 5 seconds)
