const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
let select = document.getElementById("breed-dropdown");
function fetchDogs(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((dogImageUrls) => {
      dogImageUrls.message.forEach((imageUrl) => {
        let imgElement = document.createElement("img");
        imgElement.setAttribute("width", "300px");
        imgElement.setAttribute("height", "300px");
        imgElement.setAttribute("src", imageUrl);
        document.getElementById("dog-image-container").appendChild(imgElement);
      });
    });
}
fetchDogs(imgUrl);

select.addEventListener("click", () => {
  returnDogsArray(breedUrl);
});

function filterByLetter(array, filterVal) {
  document.getElementById("dog-breeds").textContent = "";
  array
    .filter((dog) => dog[0] === filterVal)
    .forEach((dog) => {
      let li = document.createElement("li");
      li.textContent = dog;
      li.style.cursor = "pointer";
      li.addEventListener("click", (e) => {
        e.target.style.color = "orange";
      });
      document.getElementById("dog-breeds").appendChild(li);
    });
}

function returnDogsArray(url) {
  let newDogsArr = [];
  fetch(url)
    .then((res) => res.json())
    .then((breeds) => {
      let dogBreeds = breeds.message;
      for (const breed in dogBreeds) {
        dogBreeds[breed].forEach((dog) => {
          newDogsArr.push(dog);
        });
      }
      if (select.value === "all") {
        document.getElementById("dog-breeds").textContent = "";
        newDogsArr.forEach((dog) => {
          let li = document.createElement("li");
          li.textContent = dog;
          li.style.cursor = "pointer";
          li.addEventListener("click", (e) => {
            e.target.style.color = "orange";
          });
          document.getElementById("dog-breeds").appendChild(li);
        });
      } else{
        filterByLetter(newDogsArr,select.value)
      }
    });
}

returnDogsArray(breedUrl);
