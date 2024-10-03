import {
  getPostContentParent,
  getPosts,
  getTimeline,
  getUsername,
} from "./parser";

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

// Function to check posts for blocked usernames
function checkPosts() {
  const timeline = getTimeline();
  if (!timeline) {
    console.log("[Threads Blocker] No timeline found.");
    return;
  }

  const posts = getPosts(timeline);
  posts.map((post) => {
    const username = getUsername(post);
    if (blocklist.includes(username)) {
      const contentParent = getPostContentParent(post);
      contentParent.insertAdjacentHTML(
        "beforebegin",
        "<span style='color:var(--barcelona-secondary-text); font-weight:bold;'>User is on universal blocklist.</span>"
      );
    }
  });
}

console.log("[Threads Blocker] Active");

// Initial fetch of the blocklist
fetchBlocklist();

// // Poll the timeline every 5-10 seconds
setInterval(() => {
  checkPosts();
}, 5000); // Adjust time as needed (5000 ms = 5 seconds)
