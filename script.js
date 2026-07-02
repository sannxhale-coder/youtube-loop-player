const input = document.getElementById("videoInput");
const playButton = document.getElementById("playButton");
const player = document.getElementById("player");
const error = document.getElementById("error");

function extractVideoId(value) {
  const text = value.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(text)) {
    return text;
  }

  try {
    const url = new URL(text);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0];
    }

    if (url.searchParams.get("v")) {
      return url.searchParams.get("v");
    }

    if (url.pathname.includes("/embed/")) {
      return url.pathname.split("/embed/")[1].split("/")[0];
    }

    if (url.pathname.includes("/shorts/")) {
      return url.pathname.split("/shorts/")[1].split("/")[0];
    }
  } catch {
    return null;
  }

  return null;
}

function loadVideo() {
  const videoId = extractVideoId(input.value);

  if (!videoId) {
    error.textContent = "Inserisci un link YouTube valido o un ID video.";
    return;
  }

  error.textContent = "";

  const params = new URLSearchParams({
    autoplay: "1",
    loop: "1",
    playlist: videoId,
    controls: "1",
    rel: "0"
  });

  player.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?${params.toString()}"
      title="YouTube video player"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
}

playButton.addEventListener("click", loadVideo);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadVideo();
  }
});
