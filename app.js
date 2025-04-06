const familyMembers = [
  {
    name: "John",
    image: "img/man_glasses_icon.PNG",
    position: { top: "20%", left: "20%" }
  },
  {
    name: "Grandpa",
    image: "img/older_man_icon.PNG",
    position: { top: "20%", left: "40%" }
  },
  {
    name: "Tom",
    image: "img/younger_man_icon.PNG",
    position: { top: "40%", left: "20%" }
  },
  {
    name: "Grandma",
    image: "img/older_woman_icon.PNG",
    position: { top: "40%", left: "40%" }
  },
  {
    name: "Mina",
    image: "img/woman_glasses_icon.PNG",
    position: { top: "60%", left: "20%" }
  },
  {
    name: "Baby",
    image: "img/baby_icon.PNG",
    position: { top: "60%", left: "40%" }
  },
  {
    name: "Rowan",
    image: "img/boy_striped_shirt_icon.PNG",
    position: { top: "80%", left: "30%" }
  }
];

function renderFamilyTree(data) {
  const container = document.getElementById("familyTree");
  container.innerHTML = "";
  
  data.forEach(person => {
    const personDiv = document.createElement("div");
    personDiv.className = "family-member";
    personDiv.style.position = "absolute";
    personDiv.style.top = person.position.top;
    personDiv.style.left = person.position.left;
    personDiv.style.transform = "translate(-50%, -50%)";
    personDiv.style.textAlign = "center";
    
    const img = document.createElement("img");
    img.src = person.image;
    img.alt = person.name;
    img.title = person.name;
    img.className = "family-icon";
    
    const nameLabel = document.createElement("div");
    nameLabel.textContent = person.name;
    nameLabel.style.marginTop = "5px";
    nameLabel.style.fontSize = "14px";
    nameLabel.style.color = "#333";
    
    personDiv.appendChild(img);
    personDiv.appendChild(nameLabel);
    container.appendChild(personDiv);
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const searchFamilyMembers = debounce(function(searchTerm) {
  const search = searchTerm.toLowerCase();
  const filtered = familyMembers.filter(person =>
    person.name.toLowerCase().includes(search)
  );
  renderFamilyTree(filtered);
}, 300);

document.getElementById("searchBar").addEventListener("input", function (e) {
  searchFamilyMembers(e.target.value);
});

// Initial render
renderFamilyTree(familyMembers);
