"use strict";

// based on: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap

// these image names could be gotten from the MongoDB
// or the images themselves could be stored there, in base64 text format
var imgList = [
	"starfield1_1920x1080",
	"starfield2_1280x0649",
	"starfield3_504x284"
];

var imgList2 = [
	"space1_1280x720",
	"space2_1920x1080",
	"space3_1920x1080",
	"space4_1920x1080",
	"space5_4096x2160",
	"space6_1920x1108"
];

var i = 0; // global current pointer to image URL
var c, ctx, img; // canvas, canvas-context, image vars
img = new Image(); // initialise image var with a blank image
var realTest = "no";

/* Will close the test window and direct user to thankyou.php*/
function completeTest(){
	location.replace("https://humanastro.csproject.org/thankyou.php");
	//window.close();
}

function changeToRealTest(){
		/* Change the text for the heading */
		var testHead = document.getElementById("testHeading");
		testHead.innerHTML = "Real Test";

		/* Change the text for explanation paragraph*/
		var explainPara = document.getElementById("explanationPara");
		explainPara.innerHTML = "Congratulations on finishing the tutorial test! Now click the 'Take Real Test' button to proceed.";

		/* Hide the bullet section from previous*/
		var explainBullet = document.getElementById("explanationBullet");
		explainBullet.style.display = "none";

		/* Show Take Real Test button*/
		var realTestBttn = document.getElementById("startReal");
		realTestBttn.style.display = "block";
		realTestBttn.onclick = callFunctions2; //call function to slide through images and change content
}

/* to control which section should be shown and which should be hidden*/
function changeSection(){
	/* Show and hide explanation section*/
	 var explanationSect = document.getElementById("explanationDiv");
	 if(explanationSect.style.display == "block"){
			 explanationSect.style.display = "none";
	 } else if (explanationSect.style.display == "none"){
		 	explanationSect.style.display = "block";
	 }

  /* Show and hide the images within the canvas section */
	 var canvasSect = document.getElementById("canvasDiv")
	 if(canvasSect.style.display == 'none'){
			 canvasSect.style.display = 'block';
	 } else if(canvasSect.style.display == "block"){
		 		canvasSect.style.display = "none";
	 }

	 /*	Hide 'Take Tutorial Test' button*/
	 var tutorBttn = document.getElementById("startTutorial");
	 tutorBttn.style.display = "none";
}


/* used to get imgUrl from second array of images (for tutorial test)*/
function getNextImgUrl(){
		 if (i<imgList.length ) {
			 console.log(i);
		   console.log(imgList[i]); // debug
			 	//var imgUrl = "/javascript/spaceImages/Calibration-"+imgList[i++]+".png";
				var imgUrl = "/humanastro/javascript/spaceImages/Calibration-"+imgList[i++]+".png";
				console.log(imgUrl); // debug
				return imgUrl;
		} else if (i>=imgList.length) {
				i=0
				changeToRealTest();
				changeSection(); //will change section back to get ready for the real test
		};
}

/* used to get imgUrl from second array of images (for real test)*/
function getNextImgUrl2(){
		 if (i<imgList2.length ) {
			 console.log(i);
		   console.log(imgList2[i]); // debug
			 	//var imgUrl = "/javascript/spaceImages/RealTest-"+imgList2[i++]+".png";
				var imgUrl = "/humanastro/javascript/spaceImages/Calibration-"+imgList[i++]+".png";
				console.log(imgUrl); // debug
				return imgUrl;
		} else if (i>=imgList2.length) {
				completeTest(); //call this function once completed
		};
}

// resize and re-add the image if the browser window is resized
function resizeCanvas(){
		//c.width  = window.innerWidth;
		//c.height = window.innerHeight;

		// preserve the aspect ratio of the image
		// will fill the browser window width or side, leaving black (body background) in the unused space
		var hRatio = 1272 / img.width    ;
		var vRatio = 722 / img.height  ;
		var ratio  = Math.min ( hRatio, vRatio );

		/*ctx.drawImage(img,	0, 0, img.width,	img.height,     // source rectangle
							0, 0, img.width*ratio, img.height*ratio); // destination rectangle*/

		// hard coded canvas elements as variables were not being read
		document.getElementById("myCanvas").getContext("2d").drawImage(img,	0, 0, img.width,	img.height,     // source rectangle
							0, 0, img.width*ratio, img.height*ratio); // destination rectangle

		console.log('new Canvas width:', 1272); // debug
		console.log('new Canvas height:', 722); // debug
}

// perform action when button is clicked
// this could be called when a timer expires or on other events
function doIt() {
		img = new Image();
		img.src = getNextImgUrl(); // every time this is called, a new image is loaded -- no need for ajax (yet)!
		img.onload = function(){ // after the image is loaded, draw it in the canvas
			resizeCanvas(); // resize the image to fit the current browser window size
		}
};

/* To iterate through the second array of images (for real test) */
function doIt2() {
		img = new Image();
		img.src = getNextImgUrl2(); // every time this is called, a new image is loaded -- no need for ajax (yet)!
		//img.onload = function(){ // after the image is loaded, draw it in the canvas
		//	resizeCanvas(); // resize the image to fit the current browser window size
		//}
};

/* to control the state of the session either it's tutorial or real test */
function changeRealTestVariable(){
		realTest = "yes";
}

/* Wil be called once the 'Tutorial Test' is clicked */
function callFunctions(){
		doIt(); //draw the images
		changeSection(); //change the section
}

/* Will be called once the 'Real Test' is clicked*/
function callFunctions2(){
	/* hide the "Take Real Test" button */
	var realTestBttn = document.getElementById("startReal");
	realTestBttn.style.display = "none";

	/* call related functions*/
	changeRealTestVariable();
	doIt2();
	changeSection();
}

function init(){
		 c = document.getElementById("myCanvas");
		 ctx = c.getContext("2d");
		 resizeCanvas();

		 /*If the user clicks the 'Start Eye Calibration' button*/
      var calibStart = document.getElementById("startTutorial");
      calibStart.onclick = callFunctions();

}

window.onload = init;
//window.onresize = resizeCanvas; // resize the canvas whenever the browser window is resized
// This will change the image if the spacebar is pressed
window.addEventListener("keydown", function(event){
		console.log('key pressed'); // debug
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		if (event.key === " " && realTest == "no"){
				doIt();
		} else if (event.key === " " && realTest == "yes") {
				doIt2();
				console.log(realTest); //for bug
		}
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}, true
);