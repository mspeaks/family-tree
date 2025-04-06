const familyData = {
  name: "Grandpa",
  image: "img/older_man_icon.PNG",
  children: [
    {
      name: "Mark",
      image: "img/man_glasses_icon.PNG",
      children: [
        {
          name: "Rowan",
          image: "img/boy_striped_shirt_icon.PNG"
        }
      ]
    },
    {
      name: "Zara",
      image: "img/woman_glasses_icon.PNG",
      children: [
        {
          name: "Raven",
          image: "img/baby_icon.PNG"
        }
      ]
    },
    {
      name: "Luke",
      image: "img/younger_man_icon.PNG"
    }
  ]
};

// Mobile list order
const mobileOrder = [
  { name: "Grandpa", image: "img/older_man_icon.PNG" },
  { name: "Grandma", image: "img/older_woman_icon.PNG" },
  { name: "Mark", image: "img/man_glasses_icon.PNG" },
  { name: "Luke", image: "img/younger_man_icon.PNG" },
  { name: "Zara", image: "img/woman_glasses_icon.PNG" },
  { name: "Rowan", image: "img/boy_striped_shirt_icon.PNG" },
  { name: "Raven", image: "img/baby_icon.PNG" }
];

function renderFamilyTree(data) {
  const container = document.getElementById("familyTree");
  container.innerHTML = "";
  
  // Create SVG container
  const width = container.clientWidth;
  const height = container.clientHeight;
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create tree layout
  const treeLayout = d3.tree()
    .size([height, width - 200]); // Swap width and height for vertical layout

  // Create hierarchy
  const root = d3.hierarchy(data);

  // Generate tree layout
  const treeData = treeLayout(root);

  // Draw links
  svg.selectAll(".link")
    .data(treeData.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical() // Change to vertical links
      .x(d => d.x)
      .y(d => d.y))
    .style("fill", "none")
    .style("stroke", "#ccc")
    .style("stroke-width", 2);

  // Create nodes
  const nodes = svg.selectAll(".node")
    .data(treeData.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Add images to nodes
  nodes.append("image")
    .attr("x", -50)
    .attr("y", -50)
    .attr("width", 100)
    .attr("height", 100)
    .attr("xlink:href", d => d.data.image)
    .style("border-radius", "50%")
    .style("cursor", "pointer")
    .style("transition", "transform 0.2s")
    .on("mouseover", function() {
      d3.select(this)
        .style("transform", "scale(1.1)")
        .style("z-index", 1);
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("transform", "scale(1)")
        .style("z-index", 0);
    });
}

function renderMobileList(data) {
  const container = document.getElementById("familyTree");
  container.innerHTML = "";
  
  const mobileList = document.createElement("div");
  mobileList.className = "mobile-list";
  
  data.forEach(person => {
    const img = document.createElement("img");
    img.src = person.image;
    img.alt = person.name;
    img.title = person.name;
    img.className = "family-icon";
    mobileList.appendChild(img);
  });
  
  container.appendChild(mobileList);
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
  if (window.innerWidth <= 768) {
    const filtered = mobileOrder.filter(person => 
      person.name.toLowerCase().includes(search)
    );
    renderMobileList(filtered);
  } else {
    const filtered = filterFamilyTree(familyData, search);
    renderFamilyTree(filtered);
  }
}, 300);

function filterFamilyTree(node, search) {
  if (!node) return null;
  
  const matches = node.name.toLowerCase().includes(search);
  const filteredNode = { ...node };
  
  if (node.children) {
    filteredNode.children = node.children
      .map(child => filterFamilyTree(child, search))
      .filter(child => child !== null);
  }
  
  if (node.parents) {
    filteredNode.parents = node.parents
      .map(parent => filterFamilyTree(parent, search))
      .filter(parent => parent !== null);
  }
  
  return (matches || (filteredNode.children && filteredNode.children.length > 0) || 
          (filteredNode.parents && filteredNode.parents.length > 0)) ? filteredNode : null;
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
  if (window.innerWidth <= 768) {
    renderMobileList(mobileOrder);
  } else {
    renderFamilyTree(familyData);
  }
}, 250));

document.getElementById("searchBar").addEventListener("input", function (e) {
  searchFamilyMembers(e.target.value);
});

// Initial render based on screen size
if (window.innerWidth <= 768) {
  renderMobileList(mobileOrder);
} else {
  renderFamilyTree(familyData);
}
