let images = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
]

images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    parentDiv.appendChild(img);
})

console.log("parentDiv", parentDiv);