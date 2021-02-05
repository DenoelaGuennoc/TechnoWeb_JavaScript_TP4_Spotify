const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer BQCoVCxrd9r6gLhOUEYZFPyLri-u_KnMUu4sWd8P1xkbuRCZWLD7hiKoVW4lqqK8C5-4QL4M6ptRHF2a7H1xeh9RVhFmMnjk2Mr7inARYdcGB6PhsYjB6T9NlNdNk5f-5g__bgYy82hB57F8DXAOKPrtAZVbBuJ_Z3A"
};
const fetchOptions = { headers: headers };

document.getElementById("fm").addEventListener("submit", chercherAlbums);

function chercherAlbums(event) {
  // Empêcher le rechargement de la page
  // car par défaut le navigateur recharge la page après un "submit"
  event.preventDefault();

  let motcle = document.getElementById("motcle").value;

  let url =
    "https://api.spotify.com/v1/search?q=" +
    motcle +
    "&type=album&market=FR&limit=10";

  // Exécution de la requête AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })

    .then((dataJSON) => {
      afficheAlbums(dataJSON.albums.items);
    })

    .catch((error) => {
      console.log(error);
    });
}
function afficheAlbums(albums) {
  console.log(albums);
  let resHTML = "";
  for (let album of albums) {
    resHTML =
      resHTML +
      '<img id="' +
      album.id +
      '" src="' +
      album.images[1].url +
      '" />';
  }
  document.getElementById("albums").innerHTML = resHTML;

  for (let elem of document.querySelectorAll("#albums > img")) {
    elem.addEventListener("click", detailsAlbum);
  }
}

function detailsAlbum(event) {
  let idAlbum = event.target.id;
  let url = "https://api.spotify.com/v1/albums/" + idAlbum;

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      afficheDetailAlbum(dataJSON);
    })
    .catch((error) => {
      console.log(error);
    });
}

function afficheDetailAlbum(album) {
  document.getElementById("disque").textContent = album.name;
  document.getElementById("chanteur").textContent = album.artists[0].name;
  let chansons = album.tracks.items;
  let resHTML = "<ul>";
  for (let chanson of chansons) {
    resHTML += '<li id="' + chanson.id + '">' + chanson.name + "</li>";
    if (chanson.preview_url) {
      resHTML +=
        '<audio id="AudioSong" controls src="' +
        chanson.preview_url +
        '">pas supporté</audio>';
    }
  }
  resHTML += "</ul>";
  document.getElementById("chansons").innerHTML = resHTML;
}
