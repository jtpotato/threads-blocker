// parser.ts
export function getPosts(): NodeListOf<HTMLDivElement> {
  return document.querySelectorAll(
    'div[data-pressable-container="true"]'
  ) as NodeListOf<HTMLDivElement>;
}

export function getTopBar(post: HTMLDivElement): HTMLDivElement {
  return post.childNodes[0].childNodes[1].childNodes[0] as HTMLDivElement;
}

export function getUsername(topBar: HTMLDivElement): string | null {
  // Assuming username is located in some specific child element of topBar, modify the selector as necessary
  const usernameElement = topBar.querySelector(".username-selector"); // Replace with the correct selector
  return usernameElement ? usernameElement.textContent : null;
}
