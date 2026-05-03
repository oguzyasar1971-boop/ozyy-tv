let video;

function showTab(tab) {
  document.getElementById("xtream").classList.add("hidden");
  document.getElementById("m3u").classList.add("hidden");
  document.getElementById("mac").classList.add("hidden");
  document.getElementById(tab).classList.remove("hidden");
}
function openApp() {
  document.querySelector(".login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  video = document.getElementById("video");
}

function playStream(url) {
  window.location.href = "play://" + url;
}
  

async function loadXtream() {
  let server = document.getElementById("server").value.trim();
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (!server || !user || !pass) {
    alert("Server, username ve password yaz");
    return;
  }

  openApp();

  let res = await fetch(`${server}/player_api.php?username=${user}&password=${pass}&action=get_live_streams`);
  let channels = await res.json();

  showChannels(channels.map(ch => ({
    name: ch.name,
    url: `${server}/live/${user}/${pass}/${ch.stream_id}.m3u8`
  })));
}

async function loadM3U() {
  let url = document.getElementById("m3uUrl").value.trim();

  if (!url) {
    alert("M3U URL yaz");
    return;
  }

  openApp();

  if (url.endsWith(".m3u8")) {
  showChannels([{ name: "Test Kanal", url: url }]);
  playStream(url);
  return;
}

let res = await fetch(url);
let text = await res.text();

showChannels(parseM3U(text));
}

function parseM3U(data) {
  let lines = data.split("\n");
  let channels = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("#EXTINF")) {
      let name = lines[i].split(",")[1] || "Kanal";
      let url = lines[i + 1];

      if (url && url.startsWith("http")) {
        channels.push({ name, url });
      }
    }
  }

  return channels;
}

function showChannels(channels) {
  let container = document.getElementById("channels");
  container.innerHTML = "";

  channels.forEach(ch => {
    let div = document.createElement("div");
    div.className = "channel";
    div.innerText = ch.name;
    div.onclick = () => playStream(ch.url);
    container.appendChild(div);
  });
}
