function $0f6a681c4346f47b$export$37623781dd5ede44() {
    const timelineSelector = document.evaluate('//*[@id="barcelona-page-layout"]/div/div/div[2]/div[1]/div[3]/div/div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const timeline = timelineSelector.snapshotItem(0);
    return timeline;
}
function $0f6a681c4346f47b$export$3790dc04c854c4c9(timeline) {
    const posts = [];
    for(let i = 0; i < timeline.children.length; i++){
        // select children 4 layers deep
        /** @type {HTMLDivElement} */ const post = timeline.children[i].children[0].children[0].children[0].children[0];
        posts.push(post);
    }
    return posts;
}
function $0f6a681c4346f47b$export$204da773c0191bd8(post) {
    const usernameNode = post.children[1].children[0].children[0].children[0].children[0];
    const username = usernameNode.innerText;
    return username;
}
function $0f6a681c4346f47b$export$ddc833a2cf3d49b4(post) {
    const contentParent = post.children[2].children[0].children[0];
    return contentParent;
}


let $fec51ac424153a18$var$blocklist = [];
// Function to fetch the blocklist
async function $fec51ac424153a18$var$fetchBlocklist() {
    try {
        const response = await fetch("https://tb-worker.jtpotatodev.workers.dev/fetch"); // Replace with the actual URL
        const data = await response.text();
        $fec51ac424153a18$var$blocklist = data.split(" "); // Space-delimited string to array
    } catch (error) {
        console.error("Error fetching blocklist:", error);
    }
}
// Function to check posts for blocked usernames
function $fec51ac424153a18$var$checkPosts() {
    const timeline = (0, $0f6a681c4346f47b$export$37623781dd5ede44)();
    if (!timeline) {
        console.log("[Threads Blocker] No timeline found.");
        return;
    }
    const posts = (0, $0f6a681c4346f47b$export$3790dc04c854c4c9)(timeline);
    posts.map((post)=>{
        const username = (0, $0f6a681c4346f47b$export$204da773c0191bd8)(post);
        if ($fec51ac424153a18$var$blocklist.includes(username)) {
            const contentParent = (0, $0f6a681c4346f47b$export$ddc833a2cf3d49b4)(post);
            contentParent.insertAdjacentHTML("beforebegin", "<span style='color:var(--barcelona-secondary-text); font-weight:bold;'>User is on universal blocklist.</span>");
        }
    });
}
console.log("[Threads Blocker] Active");
// Initial fetch of the blocklist
$fec51ac424153a18$var$fetchBlocklist();
// // Poll the timeline every 5-10 seconds
setInterval(()=>{
    $fec51ac424153a18$var$checkPosts();
}, 5000); // Adjust time as needed (5000 ms = 5 seconds)


//# sourceMappingURL=content.js.map
