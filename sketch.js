//camera switch from https://github.com/processing/p5.js/issues/4140
//write text pgcanvas from https://editor.p5js.org/gcrll/sketches/HzEt0xdB4 
var capture;
let switchFlag = false;
let switchBtn;
let timerBtn;
let timer; // Duration in seconds
let isRecording = false;
let img;
let title;
let button;
let button2;
let inputElem;
let human2Elem;
let human2;
let nameBoxLeft;
let typeBoxRight;
let leftType;
let myFont;
let nameBoxRight;
let typeLeft;
let typeRight;
let typeLBtn;
let typeRBtn;
let pg;
let CONTAIN, LEFT;
var options = {
  video: {
    facingMode: {
      exact: "user",
    },
  },
};

function preload() {
  myFont = loadFont(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/RosesareFF0000.ttf?v=1693761834273"
  );
  img = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/actual%20frame%20size.png?v=1693773048057"
  );
  //img.resize(windowWidth, windowHeight);
  title = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/soffTitle.png?v=1693831043178"
  );
  nameBoxLeft = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/name%20box%20left%20.png?v=1693761696467"
  );
  leftType = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/left%20type%20box.png?v=1693761696991"
  );
  typeBoxRight = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/type%20box%20right.png?v=1693761695266"
  );
  nameBoxRight = loadImage(
    "https://cdn.glitch.global/c95b5276-6daf-4dd9-a774-a2afa9ad2787/name%20box%20right.png?v=1693761695749"
  );
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);

  textFont(myFont);
  pg.textFont(myFont);
  input = createInput();
  input.position(2, height/2+188);
  input.size(80);
  input.style("background", "#c69ef7");

  human2 = createInput();
  human2.position(width-185, height/2+188);
  human2.size(80);
  human2.style("background", "#c69ef7");

  button = createButton("individual#1");
  button.position(80, height/2+185);
  button.style("color", "#39FF14");
  button.style("background", "#000");
  button.style("font-family", "monospace");
  button.style("text-decoration", "none");

  button2 = createButton("individual#2");
  button2.position(width-120, height/2+185);
  button2.style("color", "#39FF14");
  button2.style("background", "#000");
  button2.style("font-family", "monospace");

  typeLeft = createInput();
  typeLeft.position(width/2-100, height-98);
  typeLeft.size(80);
  typeLeft.style("background", "#c69ef7");

  typeLBtn = createButton("characteristic #1");
  typeLBtn.position(width/2-25, height-100);
  typeLBtn.style("color", "#39FF14");
  typeLBtn.style("background", "#000");
  typeLBtn.style("font-family", "monospace");

  typeRight = createInput();
  typeRight.position(width/2-100, height-68);
  typeRight.size(80);
  typeRight.style("background", "#c69ef7");

  typeRBtn = createButton("characteristic #2");
  typeRBtn.position(width/2-25, height-70);
  typeRBtn.style("color", "#39FF14");
  typeRBtn.style("background", "#000");
  typeRBtn.style("font-family", "monospace");

  capture = createCapture(options);

  switchBtn = createButton("Switch Camera");
  switchBtn.position(width/2-50, 5);
  switchBtn.mousePressed(switchCamera);
  switchBtn.style("color", "#39FF14");
  switchBtn.style("text-decoration: none");
  switchBtn.style("background", "#000");
  switchBtn.style("font-family", "monospace");

  capture.hide();

  timerBtn = createButton("Take picture");
  timerBtn.style("color", "#39FF14");
  timerBtn.style("background", "#000");
  timerBtn.style("font-family", "monospace");
  timerBtn.position(width/2-50, height-35);
  timerBtn.mousePressed(startTimer);

  pg.textSize(8);

  pg.fill(0, 255, 0);
 // img.resize(1080,1350);
}

function switchCamera() {
  switchFlag = !switchFlag;
  stopCapture();
  if (switchFlag == true) {
    capture.remove();
    options = {
      video: {
        facingMode: {
          exact: "environment",
        },
      },
    };
  } else {
    capture.remove();
    options = {
      video: {
        facingMode: {
          exact: "user",
        },
      },
    };
  }
  
  capture = createCapture(options);
  capture.hide();
  switchBtn.style("background", "magenta");
  switchBtn.style("color", "#000");
}

function draw() {
  background(90, 23, 179);

  image(capture, 0, 40, img.width / 2.9, img.height / 2.9);
  
  image(img, 0, 40, img.width / 2.9, img.height / 2.9);
  
  image(title, -10, 55, title.width / 9, title.height / 9);
  image(
    nameBoxLeft,
    -8,
    height/2 +95,
    nameBoxLeft.width / 10,
    nameBoxLeft.height / 10
  );
  image(
    nameBoxRight,
    width - 170,
    height/2 +95,
    nameBoxRight.width / 10,
    nameBoxRight.height / 10
  );

  image(leftType, -8, height/2 +125, leftType.width / 11, leftType.height / 11);

  image(
    typeBoxRight,
    width / 2-5,
    height/2 +125,
    typeBoxRight.width / 11,
    typeBoxRight.height / 11
  );

  textAlign(CENTER, CENTER);
  fill(57, 255, 20);
  textSize(150);
  // text(key,width/2,height/2)

  if (timer > 0) {
    text(timer, width / 2, height / 2);
  }

  button.mousePressed(human1);
  button2.mousePressed(humans);
  typeLBtn.mousePressed(typeLeftBtn);
  typeRBtn.mousePressed(typeRightBtn);

  image(pg, 0, 0);
}

function stopCapture() {
  let stream = capture.elt.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  capture.elt.srcObject = null;
}

function startTimer() {
  isRecording = true;
  timer = 10;
  countdown();
  timerBtn.style("background", "magenta");
  timerBtn.style("color", "#000");
}

function countdown() {
  if (timer > 0) {
    timer--;
    setTimeout(countdown, 1000); // Call countdown again after 1 second
  } else {
    stopRecording();
  }
}

function stopRecording() {
  isRecording = false;
  capture.stop();
  console.log("Recording stopped.");
  // Add code here to save or process the recorded frames.
  saveCanvas("SOFFGame1+1=1", "jpg");
  push();
  pg.fill(0);
  pg.rect(0,0,width,height);
  pop();
  pg.textSize(12);
  pg.fill('#39FF14');
  pg.text('Interaction successful!',width/2-150,height/2-100);
  pg.text('You have built an interdimensional body.',width/2-150,height/2-50);
  pg.text('Find it in your downloads',width/2-150,height/2-25);
  pg.text('and share it with others.',width/2-150,height/2);
  pg.text('Lots of love,',width/2-150,height/2+25);
  pg.text('SOFF <3',width/2-150,height/2+50);
  input.style('display','none');
  human2.style('display','none');
  button.style('display','none');
  button2.style('display','none');
  typeLeft.style('display','none');
  typeLBtn.style('display','none');
  typeRight.style('display','none');
  typeRBtn.style('display','none');
  switchBtn.style('display','none');
  timerBtn.style('display','none');

}

function human1() {
  //  pg.clear();
  const name = input.value();

  input.value("");
  button.style("color", "#000");
  button.style("background", "magenta");
  // pg.textAlign(CENTER);

  pg.text(name,  10, height/2 +120);
}

function humans() {
  const name2 = human2.value();
  human2.value("");
  pg.text(name2,width/2+55 , height/2 +120);
  button2.style("background", "magenta");
  button2.style("color", "#000");
}

function typeRightBtn() {
  //pg.clear();
  const typeR = typeRight.value();
  typeRight.value("");
  typeRBtn.style("background", "magenta");
  typeRBtn.style("color", "#000");
  pg.text(typeR, width/2+20, height / 2 + 153);
}

function typeLeftBtn(){
  const typeL = typeLeft.value();
  typeLeft.value("");
  typeLBtn.style("background", "magenta");
  typeLBtn.style("color", "#000");
  pg.text(typeL, 10, height / 2 + 153);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
