
const familyMembers = [
  {
    name: "John",
    image: "icons/man_glasses_icon.png",
    position: { top: "100px", left: "100px" }
  },
  {
    name: "Grandpa",
    image: "icons/older_man_icon.png",
    position: { top: "100px", left: "250px" }
  },
  {
    name: "Tom",
    image: "icons/younger_man_icon.png",
    position: { top: "250px", left: "100px" }
  },
  {
    name: "Grandma",
    image: "icons/older_woman_icon.png",
    position: { top: "250px", left: "250px" }
  },
  {
    name: "Mina",
    image: "icons/woman_glasses_icon.png",
    position: { top: "400px", left: "100px" }
  },
  {
    name: "Baby",
    image: "icons/baby_icon.png",
    position: { top: "400px", left: "250px" }
  },
  {
    name: "Rowan",
    image: "icons/boy_striped_shirt_icon.png",
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
