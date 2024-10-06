// blocklist.ts
let blocklist: string[] = [];

// Function to fetch the blocklist
export async function fetchBlocklist() {
  try {
    const response = await fetch(
      "https://tb-worker.jtpotatodev.workers.dev/fetch" // Replace with the actual URL
    );
    const data = await response.text();
    blocklist = data.split(" "); // Space-delimited string to array
  } catch (error) {
    console.error("Error fetching blocklist:", error);
  }
}

export function getBlocklist() {
  return blocklist;
}
