const image = document.getElementById('output');
const canvasContainer = document.querySelector('.canvas-container');
const canvasSize = 3000;
canvasContainer.innerHTML = `<canvas id="canvas" width="${canvasSize}px" height="${canvasSize}px" style="background-color: #000000"></canvas>`;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasImageWidth;
let canvasImageHeight;

function drawImageOnCanvas() {
    const startX = (canvasSize - canvasImageWidth)/2;
    const startY = (canvasSize - canvasImageHeight)/2;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.beginPath();
    ctx.drawImage(image, startX, startY, canvasImageWidth, canvasImageHeight);
}

const loadFile = function(event) {
	image.src = URL.createObjectURL(event.target.files[0]);
    image.addEventListener('load', function() {
        canvasImageWidth = image.naturalWidth;
        canvasImageHeight = image.naturalHeight;
        drawImageOnCanvas();
    }) 
};
document.getElementById('photo').addEventListener('input', loadFile);

const imgBox = document.querySelector('.img-box__mousefield');
let isDragging = false;
let startX = 0;
let startY = 0;
let stopX = 0;
let stopY = 0;
let mousedownCounter = 0;





const transformXinput = document.getElementById('transform-x');
const transformYinput = document.getElementById('transform-y');
const newImageDimensions = document.querySelector('.new-dimensions');
let transformX = 0;
let transformY = 0;
let transX = 1;
let transY = 1;

function setTransformation() {
    transX = transformXinput.value;
    transY = transformYinput.value;
    let imageWidth = Math.floor(image.width * transX);
    let imageHeight = Math.floor(image.height * transY);
    canvasImageWidth = Math.floor(image.naturalWidth * transX);
    canvasImageHeight = Math.floor(image.naturalHeight * transY);
    newImageDimensions.innerHTML = `new image dimensions: ${canvasImageWidth} x ${canvasImageHeight}`;
    document.querySelector('.x-squeeze__value').innerHTML = transX;
    document.querySelector('.y-squeeze__value').innerHTML = transY;
    image.style.transform = `scaleX(${transX}) scaleY(${transY}) translate(${transformX}px, ${transformY}px)`;
    drawImageOnCanvas();
}

function dragImage() {
    
    imgBox.addEventListener('mousedown', (e) => {
        setTransformation();
        isDragging = true;
        console.log('mouse down');
        mousedownCounter = mousedownCounter + 1;
        if (mousedownCounter === 1) {
            startX = e.offsetX;
            startY = e.offsetY;
        } else {
            startX = e.offsetX - (stopX - startX);
            startY = e.offsetY - (stopY - startY);
        }
    });
    imgBox.addEventListener('mousemove', (e) => {
        
        e.preventDefault();
        if (isDragging) { 
            newX = e.offsetX;
            newY = e.offsetY;
            transformX = newX - startX;
            transformY = newY - startY;     
            image.style.transform = `scaleX(${transX}) scaleY(${transY}) translate(${transformX}px, ${transformY}px)`;
        }
    });
    imgBox.addEventListener('mouseup', (e) => {
        console.log('mouse up!');
        stopX = e.offsetX;
        stopY = e.offsetY;
        if (isDragging) {
            isDragging = false;
        } 
    });
}
dragImage();


transformXinput.addEventListener('input', setTransformation);
transformYinput.addEventListener('input', setTransformation);

function downloadImg() {
    const downloadedImage = canvas.toDataURL("image/jpg");
    this.href = downloadedImage;
    console.log('image download');
  };
document.getElementById('download').addEventListener('click', downloadImg);
