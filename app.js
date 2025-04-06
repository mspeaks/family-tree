const familyMembers = [
  {
    name: "John",
    image: "img/man_glasses_icon.PNG",
    position: { top: "100px", left: "100px" }
  },
  {
    name: "Grandpa",
    image: "img/older_man_icon.PNG",
    position: { top: "100px", left: "250px" }
  },
  {
    name: "Tom",
    image: "img/younger_man_icon.PNG",
    position: { top: "250px", left: "100px" }
  },
  {
    name: "Grandma",
    image: "img/older_woman_icon.PNG",
    position: { top: "250px", left: "250px" }
  },
  {
    name: "Mina",
    image: "img/woman_glasses_icon.PNG",
    position: { top: "400px", left: "100px" }
  },
  {
    name: "Baby",
    image: "img/baby_icon.PNG",
    position: { top: "400px", left: "250px" }
  },
  {
    name: "Rowan",
    image: "img/boy_striped_shirt_icon.PNG",
    position: { top: "550px", left: "175px" }
  }
];

function renderFamilyTree(data) {
  const container = document.getElementById("familyTree");
  container.innerHTML = "";
  data.forEach(person => {
    const img = document.createElement("img");
    img.src = person.image;
    img.alt = person.name;
    img.title = person.name;
    img.className = "family-icon";
    img.style.top = person.position.top;
    img.style.left = person.position.left;
    container.appendChild(img);
  });
}

document.getElementById("searchBar").addEventListener("input", function (e) {
  const search = e.target.value.toLowerCase();
  const filtered = familyMembers.filter(person =>
    person.name.toLowerCase().includes(search)
  );
  renderFamilyTree(filtered);
});

renderFamilyTree(familyMembers);
