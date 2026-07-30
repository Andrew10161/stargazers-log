document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("starred-repos");

  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      list.innerHTML = '<li class="error">No starred repositories found.</li>';
      return;
    }

    list.innerHTML = events
      .map((event) => {
        const starredDate = new Date(event.starred_at).toLocaleDateString();

        return `
          <li class="repo-item">
            <a href="${event.html_url}" target="_blank" rel="noreferrer">${event.repo}</a>
            <p>${event.description}</p>
            <div class="repo-meta">Starred by ${event.stargazer} on ${starredDate}</div>
          </li>
        `;
      })
      .join("");
  } catch (error) {
    list.innerHTML = '<li class="error">Unable to load starred repositories right now.</li>';
    console.error(error);
  }
});
