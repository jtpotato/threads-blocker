import "./button.css";

export function createBlockButton(username: string, post: HTMLDivElement) {
  const button = document.createElement("button");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-gavel"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" /><path d="M6 9l4 4" /><path d="M13 10l-4 -4" /><path d="M3 21h7" /><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" /></svg>`;
  button.className = "tb-block-button";

  button.title = "Add to Universal Blocklist";

  button.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    // Add username to blocklist
    fetch("https://tb-worker.jtpotatodev.workers.dev/add", {
      method: "POST",
      body: JSON.stringify({ username: username }),
    });

    console.log(`[Threads Blocker] added ${username} to blocklist`);

    // Remove post from page
    post.remove();
  });

  return button;
}
