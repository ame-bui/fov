let img;
let avgRed = 0;
let avgGreen = 0;
let avgBlue = 0;

let dragging = false;
let rollover = false;

let x, y, w, h; // Location and size
let offsetX, offsetY;

preload = () => {
  const url =
    "https://fragments.codepanel.in//sites/default/files/2024-02/417517721_1553787068806872_5572815990591405809_n.jpg";
  img = loadImage("IMG_4554.jpg");
};

setup = () => {
  createCanvas(windowWidth, windowHeight);
  // Starting location
  x = 100;
  y = 100;

  // Dimensions
  w = 300;
  h = 400;

  img.resize(width, height);

  // Load the pixels
  img.loadPixels();

  // Loop through the pixels X and Y
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Calculate the pixel index
      const index = (y * img.width + x) * 4;

      // Sum the red, green, and blue values
      avgRed += img.pixels[index + 0];
      avgGreen += img.pixels[index + 1];
      avgBlue += img.pixels[index + 2];
    }
  }

  // We're finished working with pixels so update them
  img.updatePixels();

  // Get the total number of pixels
  // Divide by 4 because the total number of pixels = pixels * numColorChannels
  const numPixels = img.pixels.length / 4;

  // divide the totals by the number of pixels to find the average.
  avgRed /= numPixels;
  avgGreen /= numPixels;
  avgBlue /= numPixels;
};

draw = () => {
  background(233);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  // only render the image if it exists
  if (img) loadPixels();
  let px = get(0, 0);
  // console.log(px);

  fill(avgRed, avgGreen, avgBlue);
  noStroke();
  // Draw a square in the center of the screen
  rectMode(CENTER);
  rect(x, y, 100, 100);
};

mousePressed = () => {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;

    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }
};

mouseReleased = () => {
  dragging = false;
};
