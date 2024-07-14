let songs = [];
// cross function
let cross = document.querySelector("#cross-i");
cross.addEventListener("click", (e) => {
  let l = document.querySelector(".left");
  l.style.left = "-100%";
});
// ham function
let ham = document.querySelector("#ham-i");
ham.addEventListener("click", (e) => {
  let l = document.querySelector(".left");
  l.style.left = "0%";
});
// showing all hidden folders
let show = document.getElementById("show");
show.addEventListener("click", (e) => {
  document.querySelectorAll(".artist").forEach((e) => {
    e.setAttribute("style", "display:block");
  });
});
// adding event listener on the folders for listing songs
document.querySelectorAll(".artist").forEach((e) => {
  e.addEventListener("click", (e) => {
    let a = e.currentTarget.getElementsByTagName("p");
    let name = a[0].innerHTML;
    let fame = name.replace(" ", "_");
    let getname = document.querySelector(`.${fame}`).getElementsByTagName("li");
    let list = document.querySelector("#list");
    list.innerHTML = "";
    songs = [];
    for (const iterator of getname) {
      let x = iterator.querySelector(".p-1").innerHTML;
      let y = iterator.querySelector(".p-2").innerHTML;
      songs.push(y);
      list.innerHTML =
        list.innerHTML +
        `<li>
          <div id="event-box" class="music-box bdr1 flex">
          <img src="icons/music.svg" alt="" />
          <div class="music-name">
            <p class="p1">${x}</p>
            <p class="p2">${name}</p>
            <p class="p3" style="display:none">${y}</p>
          </div>
          <img src="icons/play.svg" alt="" />
          </div>
        </li>`;
    }
    listed();
  });
});
// adding event listeners on list
function listed() {
  let l = document.querySelector("#list").getElementsByTagName("li");
  for (const iterator of l) {
    iterator.addEventListener("click", (e) => {
      let div = iterator.getElementsByClassName("music-name");
      let disc = document.createElement("div");
      disc.innerHTML = div[0].innerHTML;
      let para = disc.querySelector(".p3");
      playmusic(para.innerHTML);
    });
  }
}
// playing the current song
let song = document.querySelector("#song");
let input = document.querySelector("#input");
function playmusic(track) {
  song.src = `${track}`;
  song.play();
  let p = document.querySelector(".para1");
  let text = track
    .split(".")[0]
    .split("/audios/")[1]
    .split("/")[1]
    .replace("_", " ");
  p.innerHTML = text;
  image.setAttribute("src", "icons/pause.svg");
  image.classList.remove("pause");
  image.classList.add("play");
  song.onloadedmetadata = function () {
    input.max = song.duration;
    input.value = song.currentTime;
    updateRangeBackground();
  };
}
// function for updating input range with song time
song.addEventListener("timeupdate", function () {
  input.value = song.currentTime;
  let p2 = document.querySelector(".para2");
  let d = formatTime(song.duration);
  p2.innerHTML = `${formatTime(song.currentTime)}/${d}`;
  updateRangeBackground();
});
// function for updating song time with input range
input.addEventListener("input", function () {
  song.currentTime = input.value;
  updateRangeBackground();
});
// function for input range for showing background
function updateRangeBackground() {
  let value = input.value;
  let max = input.max;
  let percentage = (value / max) * 100;
  input.style.background = `linear-gradient(to right, white ${percentage}%, #555 ${percentage}%)`;
}
// controlling song using play button
let player = document.querySelector(".player-box");
let image = document.querySelector("#player");
player.addEventListener("click", (e) => {
  if (image.classList.contains("pause")) {
    song.play();
    image.setAttribute("src", "icons/pause.svg");
    image.classList.remove("pause");
    image.classList.add("play");
  } else {
    song.pause();
    image.setAttribute("src", "icons/player.svg");
    image.classList.remove("play");
    image.classList.add("pause");
  }
});
// time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
// previous song
let prev = document.querySelector("#prev");
prev.addEventListener("click", (e) => {
  console.log(song.src);
  let prevText = song.src.split(".app")[1];
  let index = songs.indexOf(prevText);
  if (index == 0) {
    index = songs.length - 1;
    playmusic(songs[index]);
  } else {
    playmusic(songs[index - 1]);
  }
});
// next song
let next = document.querySelector("#next");
next.addEventListener("click", (e) => {
  let nextText = song.src.split(".app")[1];
  let index = songs.indexOf(nextText);
  if (index == songs.length - 1) {
    playmusic(songs[0]);
  } else {
    playmusic(songs[index + 1]);
  }
});
