document
  .getElementById("blockForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById("username").value;

    const url = "https://tb-worker.jtpotatodev.workers.dev/add"; // Change as needed

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  });
