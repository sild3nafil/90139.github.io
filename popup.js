const images = [...document.querySelectorAll('.gallery-image')];

// popup

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');
const imageName = document.querySelector('.image-name');
const largeImage = document.querySelector('.large-image');
const imageIndex = document.querySelector('.index');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let index = 0; // will track our current image;

images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        popup.classList.toggle('active');
    })
})

const updateImage = (i) => {
    let path1;
    let path2 = `img/img${i+1}.png`;
    switch(i){
        case 0:
            path1 = "2D to 3D Transformation: Wassily Kandinsky - Thirty.png";
            break;
        case 1:
            path1 = "Body Observation: Groovy Bonsai Tree.png";
            break;
        case 2:
            path1 = "Furniture Observation: Refrigerator.png";
            break;
        case 3:
            path1 = "Polyhedron 40: Mushroom.png";
            break;
        case 4:
            path1 = "Construction Toy: MOSFETs.png";
            break;
        case 5:
            path1 = "Campus Proposal: Rotated Hexagon Dormitory Lounge.png";
            break;
    }
    largeImage.src = path2;
    imageName.innerHTML = path1;
    //imageIndex.innerHTML = `0${i+1}`;
    index = i;
}

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

/*leftArrow.addEventListener('click', () => {
    if(index > 0){
        updateImage(index - 1);
    }
})

rightArrow.addEventListener('click', () => {
    if(index < images.length - 1){
        updateImage(index + 1);
    }
})*/