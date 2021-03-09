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
const transformXinput = document.getElementById('transform-x');
const transformYinput = document.getElementById('transform-y');
const newImageDimensions = document.querySelector('.new-dimensions');

function setDegrees() {
    const transX = transformXinput.value;
    const transY = transformYinput.value;
    let imageWidth = Math.floor(image.width * transX);
    let imageHeight = Math.floor(image.height * transY);
    canvasImageWidth = Math.floor(image.naturalWidth * transX);
    canvasImageHeight = Math.floor(image.naturalHeight * transY);
    newImageDimensions.innerHTML = `new image dimensions: ${canvasImageWidth} x ${canvasImageHeight}`;
    document.querySelector('.transform-x-value').innerHTML = transX;
    document.querySelector('.transform-y-value').innerHTML = transY;
    image.style.transform = `scaleX(${transX}) scaleY(${transY})`;
    drawImageOnCanvas();
}
transformXinput.addEventListener('input', setDegrees);
transformYinput.addEventListener('input', setDegrees);

function downloadImg() {
    const downloadedImage = canvas.toDataURL("image/jpg");
    this.href = downloadedImage;
    console.log('image download');
  };
document.getElementById('download').addEventListener('click', downloadImg);
