const galleryImage = document.getElementById("galleryImage");
const imageTitle = document.getElementById("imageTitle");
const description = document.getElementById("description");
const category = document.getElementById("category");
const counter = document.getElementById("counter");
const changeButton = document.getElementById("changeButton");

const dots = document.querySelectorAll(".dots span");


const gallery = [

    {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
        category: "TECHNOLOGY",
        title: "Digital Future",
        description: "A glimpse into the world where technology connects ideas, people and intelligent systems."
    },

    {
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1000&q=80",
        category: "SCIENCE",
        title: "Inside Innovation",
        description: "Modern science turns curiosity into discoveries that can reshape the way we understand our world."
    },

    {
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
        category: "CODE",
        title: "Think in Code",
        description: "Every application begins with logic, creativity and a simple idea waiting to become reality."
    },

    {
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
        category: "ARTIFICIAL INTELLIGENCE",
        title: "Intelligence",
        description: "Artificial intelligence combines data, algorithms and computation to create intelligent solutions."
    }

];


let currentIndex = 0;


function changeImage() {

    currentIndex++;

    if (currentIndex >= gallery.length) {
        currentIndex = 0;
    }


    const current = gallery[currentIndex];


    galleryImage.src = current.image;
    galleryImage.alt = current.title;

    imageTitle.textContent = current.title;

    description.textContent = current.description;

    category.textContent = current.category;

    counter.textContent =
        `0${currentIndex + 1} / 0${gallery.length}`;


    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    dots[currentIndex].classList.add("active");

}


changeButton.addEventListener("click", changeImage);