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
var timer = 5000; //default timer value everytime it is called

/* Will close the test window and direct user to thankyou.php*/
function completeTest(){
	location.replace("https://humanastro.csproject.org/thankyou.php");

	/* Change the text for explanation paragraph*/
	// var explainPara = document.getElementById("explanationPara");
	// explainPara.innerHTML = "Congratulations on completing the real visualisation test! Click the 'Finish' button to clos the test.";
	//
	// /* Show Finish button*/
	// var finishBttn = document.getElementById("finishBttn");
	// finishBttn.style.display = "block";
	//
	// /* Show explanation section*/
	//  var explanationSect = document.getElementById("explanationDiv");
	//  if(explanationSect.style.display == "block"){
	// 		 explanationSect.style.display = "none";
	//  } else if (explanationSect.style.display == "none"){
	// 	 	explanationSect.style.display = "block";
	//  }
}

function changeToRealTest(){
		/* Change the text for the heading */
		var testHead = document.getElementById("testHeading");
		testHead.innerHTML = "Real Test";

		/* Change the text for explanation paragraph*/
		var explainPara = document.getElementById("explanationPara");
		explainPara.innerHTML = "Congratulations on finishing the tutorial test! Now click the 'Take Real Test' button to proceed.";

		/* Hide the bullet section from previous*/
		//var explainBullet = document.getElementById("explanationBullet");
		//explainBullet.style.display = "none";
		
		
		/* Show Take Real Test button*/
		var realTestBttn = document.getElementById("startReal");
		realTestBttn.style.display = "block";
		/*Change the status of real test variable(to med until start real test bttn is clicked) to stop timer from continue looping when spacebar is pressed*/
		realTest = "med";
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

//// cycle through the image URLs - call a new image each time this is called
// function getNextImgUrl(){
// 	if (i>=imgList.length) i=0; //will return back to i=0 if it reaches the end of array
// 	var imgUrl = '/javascript/spaceImages/Calibration-'+imgList[i++]+'.png';
// 	console.log(imgUrl); // debug
//
// 	return imgUrl;
// }

/* used to get imgUrl from second array of images (for tutorial test)*/
function getNextImgUrl(){
		 if (i<imgList.length ) {
			 console.log(i);
		   console.log(imgList[i]); // debug
			 	var imgUrl = "/javascript/spaceImages/Calibration-"+imgList[i++]+".png";
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
			 	var imgUrl = "/javascript/spaceImages/RealTest-"+imgList2[i++]+".png";
				console.log(imgUrl); // debug
				return imgUrl;
		} else if (i>=imgList2.length) {
				completeTest(); //call this function once completed
		};
}

// resize and re-add the image if the browser window is resized
function resizeCanvas(){
		c.width  = window.innerWidth;
		c.height = window.innerHeight;

		// preserve the aspect ratio of the image
		// will fill the browser window width or side, leaving black (body background) in the unused space
		var hRatio = c.width / img.width    ;
		var vRatio = c.height / img.height  ;
		var ratio  = Math.min ( hRatio, vRatio );

		ctx.drawImage(img,	0, 0, img.width,	img.height,     // source rectangle
							0, 0, img.width*ratio, img.height*ratio); // destination rectangle

							console.log('new Canvas width:', c.width); // debug
							console.log('new Canvas height:', c.height); // debug
							console.log('Canvas scale ratio %:', Math.floor(parseFloat(imgScaleRatio*100))); // debug
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
		img.onload = function(){ // after the image is loaded, draw it in the canvas
			resizeCanvas(); // resize the image to fit the current browser window size
		}
};

/* to control the state of the session either it's tutorial or real test */
function changeRealTestVariable(){
		realTest = "yes";
}

/* for tutorial test*/
function callFunctions(){
		changeSection();
		setTimer();
}

/* for real test*/
function callFunctions2(){
	/* hide the "Take Real Test" button */
	var realTestBttn = document.getElementById("startReal");
	realTestBttn.style.display = "none";

	/* call related functions*/
	changeRealTestVariable();
	changeSection();
	setTimer2();
}

//function for controlling image changes using timer for tutorial test
function setTimer(){
	if (realTest == "no" && i < imgList.length){
		doIt();
		console.log("5 seconds timer started for tutorial test");
		window.setTimeout(function(){
			//loop the function as long as the last image in the imgList(tutorial images) is not loaded
			setTimer();
		}, timer);
		//debug timer loop count
		console.log(realTest+","+i);
	} 	
	else{
		//debug exit loop
		console.log("Timer loop exited")
		//stop loop and proceed
		doIt();
	} 
};

//function for controlling image changes using timer for tutorial test
function setTimer2(){
	if (realTest == "yes" && i < imgList2.length){
		doIt2();
		console.log("5 seconds timer started for real test");
		window.setTimeout(function(){
			//loop the function as long as the last image in the imgList2(real images) is not loaded
			setTimer2();
		}, timer);
		//debug timer loop count
		console.log(realTest+","+i);
	} 	
	else{
		//debug exit loop
		console.log("Timer2 loop exited")
		//stop loop and proceed
		doIt2();
	} 
};

function init(){
		 c = document.getElementById("myCanvas");
		 ctx = c.getContext("2d");
		 //resizeCanvas();

    /*If the user clicks the 'changeContent' button*/
     var changeContent = document.getElementById("startTutorial");
     changeContent.onclick = callFunctions;
}

window.onload = init;
window.onresize = resizeCanvas; // resize the canvas whenever the browser window is resized
//This will change the image if the spacebar is pressed
window.addEventListener("keydown", function(event){
		console.log('key pressed'); // debug
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		if (event.key === " " && realTest == "no"){
				doIt();
				timer = 5000;//reset timer back to 5 seconds everytime spacebar is pressed
		} else if (event.key === " " && realTest == "yes") {
				doIt2();
				timer = 5000;//reset timer back to 5 seconds everytime spacebar is pressed
				console.log(realTest); //for bug
		}
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}, true
);