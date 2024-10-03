export function getTimeline(): HTMLDivElement | null {
  const timelineSelector = document.evaluate(
    '//*[@id="barcelona-page-layout"]/div/div/div[2]/div[1]/div[3]/div/div[1]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  const timeline = timelineSelector.snapshotItem(0) as HTMLDivElement | null;
  return timeline;
}

export function getPosts(timeline: HTMLDivElement) {
  const posts: HTMLDivElement[] = [];
  for (let i = 0; i < timeline.children.length; i++) {
    // select children 4 layers deep
    /** @type {HTMLDivElement} */
    const post =
      timeline.children[i].children[0].children[0].children[0].children[0];

    if (post.tagName.toLowerCase() !== "div") {
      // then it's not really a post, it could be something else.
      continue;
    }

    posts.push(post as HTMLDivElement);
  }

  return posts;
}

export function getUsername(post: HTMLDivElement) {
  // console.log(post);
  const usernameNode = post.children[1].children[0].children[0].children[0]
    .children[0] as HTMLSpanElement;
  const username = usernameNode.innerText;
  // console.log("[Threads Blocker] Username detected: ", username);
  return username;
}

export function getPostContentParent(post: HTMLDivElement) {
  const contentParent = post.children[2].children[0]
    .children[0] as HTMLDivElement;
  return contentParent;
}
