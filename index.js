let i = 0;
let j = 0;
const fetchAPI = async () => {
  const response = await fetch(
    "https://api.openopus.org/composer/list/epoch/Baroque.json"
  );
  const Rescomp = await response.json();
  Composers = Rescomp.composers;
  console.log(Composers);
  generateHtml(Composers);
  return Composers;
};

const fetchWORK = async (id) => {
  const response = await fetch(
    `https://api.openopus.org/work/list/composer/${id}/genre/all.json`
  );
  const Res = await response.json();
  Works = Res.works;
  console.log(Works);
  displayWorks(Works);
  return Works;
};
const displayWorks = (Works) => {
  let Workdisplay = "";
  for (j; j < 10; j++) {
    Workdisplay += `<li>${Works[j].title}</li>`;
    const workdiv = document.querySelector(".works-list");
    workdiv.innerHTML = Workdisplay;
  }
  return j;
};
const PrevWorks = () => {
  h = j;
  Work = "";
  for (h; h >= j - 10; h--) {
    Work += `<li>${Works[h].title}</li>`;
    const workdiv = document.querySelector(".works-list");
    workdiv.innerHTML = Work;
  }
  j = h;
  return j;
};
const SeeMore = () => {
  h = j;
  Work = "";
  for (h; h <= j + 10; h++) {
    Work += `<li>${Works[h].title}</li>`;
    const workdiv = document.querySelector(".works-list");
    workdiv.innerHTML = Work;
  }
  j = h;
  return j;
};

const generateHtml = (data) => {
  let img = `<img src="${data[i].portrait}" alt="Composer portrait" />`;
  const imgdiv = document.querySelector(".is-4by3");
  imgdiv.innerHTML = img;
  let identity = `<p class="title is-4">${data[i].complete_name}</p>
  <p class="subtitle is-7"><img src="sun.png"/> ${data[i].birth}  <img src="risk-skull.png"/> ${data[i].death}</p>`;
  const composerdiv = document.querySelector(".media-content");
  composerdiv.innerHTML = identity;
  fetchWORK(data[i].id);
};

const nextComp = () => {
  i++;
  if (i < Composers.length - 1) {
    generateHtml(Composers);
  } else {
    i = 0;
    generateHtml(Composers);
  }
};

const prevComp = () => {
  i--;
  if (i >= 0) {
    generateHtml(Composers, i);
  } else {
    i = Composers.length - 1;
    generateHtml(Composers, i);
  }
};

fetchAPI();
