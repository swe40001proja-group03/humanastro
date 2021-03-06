"use strict";

function validatedemo(){

	//initialize local variables
	var errMsg = "";			//stores the error message
	var result = true;			//assumes no errors

	//get variables from form and check rules here

	//new variables for Age Range
	var under18 = document.getElementById("<18").selected;
	var to1824 = document.getElementById("18-24").selected;
	var to2534 = document.getElementById("25-34").selected;
	var to3544 = document.getElementById("35-44").selected;
	var to4554 = document.getElementById("45-54").selected;
	var over55 = document.getElementById(">55").selected;
	var over18= document.getElementById("18+").selected;

	//Gender question is removed
	/*var female = document.getElementById("female").checked;
	var male = document.getElementById("male").checked;
	var nonbinary = document.getElementById("nb").checked;
	var gennot = document.getElementById("gennot").checked;
	var selfdesc = document.getElementById("sd").checked;*/

	//Old version of Career Stage
	/*var udgm = document.getElementById("udm").selected;
	var phd = document.getElementById("phd").selected;
	var phd5 = document.getElementById("5phd").selected;
	var phd515 = document.getElementById("5phd15").selected;
	var phd15 = document.getElementById("phd15").selected;
	var csnot = document.getElementById("csnot").selected;*/

	//new variables for Career Stage
	var udgm = document.getElementById("udgm").selected;
	var phd = document.getElementById("pgd").selected;
	var phd5 = document.getElementById("5phd").selected;
	var phd59 = document.getElementById("5phd9").selected;
	var phd1020 = document.getElementById("10phd20").selected;
	var phd20 = document.getElementById("phd20").selected;

	//variables for Region
	var regAfr = document.getElementById("africa").selected;
	var regAsia = document.getElementById("asia").selected;
	var regEur= document.getElementById("europe").selected;
	var regNorthAm = document.getElementById("northAm").selected;
	var regCentralAm = document.getElementById("centralAm").selected;
	var regSouthAm = document.getElementById("southAm").selected;
	var regAusNZ = document.getElementById("ausnz").selected;
	var regMidEast = document.getElementById("midEast").selected;
	var regOther = document.getElementById("oth").selected;
	var regNot = document.getElementById("geoNot").selected;

	//Old version of Research Area
	/*var ooIRast = document.getElementById("ooIRast").selected;
	var ora = document.getElementById("ora").selected;
	var ooth = document.getElementById("ooth").selected;
	var tcast = document.getElementById("tcast").selected;
	var irs = document.getElementById("irs").selected;
	var areanot = document.getElementById("areanot").selected;*/

	//new variables for Research Area
	var optIR = document.getElementById("optIR").selected;
	var radioAst = document.getElementById("radioAst").selected;
	var multiWave = document.getElementById("multiWave").selected;
	var obsOther = document.getElementById("obsOther").selected;
	var theoAst = document.getElementById("theoAst").selected;
	var compAst = document.getElementById("compAst").selected;
	var instSoftware = document.getElementById("instSoftware").selected;
	var arOther = document.getElementById("arOther").selected;
	var areaNot = document.getElementById("areaNot").selected;

	//new variables for Formal Training
	var ftYes = document.getElementById("ftYes").selected;
	var ftNo = document.getElementById("ftNo").selected;
	var ftNS = document.getElementById("ftNS").selected;
	var ftNot = document.getElementById("ftNot").selected;

	//new variables for Informal Training
	var iftYes = document.getElementById("iftYes").selected;
	var iftNo = document.getElementById("iftNo").selected;
	var iftNS = document.getElementById("iftNS").selected;
	var iftNot = document.getElementById("iftNot").selected;



	//if something is wrong set result = false, and concatenate error message

	/*Must select age*/
	if (!(under18 || to1824 || to2534 || to3544 || to4554 || over55 || over18)) {
		errMsg += "Please select your age group. \n"
		result = false;
	}

	/*Must select gender*/
	/*if (!(female || male || nonbinary || gennot || selfdesc)) {
		errMsg += "Please select your gender. \n"
		result = false;
	}*/

	if (errMsg != ""){
		window.alert(errMsg);
	}

	return result;
}

function gohome(){
	window.location = "index.php";
}

//function to enfore required on textbox
/*function setRequired(){
	document.getElementById("gendesc").required = true;
}*/

/*function removeRequired(){
	if(document.getElementById("gendesc").required == true){
		document.getElementById("gendesc").required = false;
	}
}*/

function init(){
	var demoform = document.getElementById("demoform"); //get ref to the HTML element
	demoform.onsubmit = validatedemo; //register the event listener*/

	var homebutt = document.getElementById("homebutt");
	homebutt.onclick = gohome;

/* gender question has been removed
	//if the self describe is chosen from gender section
	var gender_sd = document.getElementById("sd");
	gender_sd.onclick = setRequired;

	//if self describe is not chosen from gender selection
	var gender_female = document.getElementById("female");
	var gender_male = document.getElementById("male");
	var gender_nb = document.getElementById("nb");
	var gender_not = document.getElementById("gennot");
	gender_female.onclick = removeRequired;
	gender_male.onclick = removeRequired;
	gender_nb.onclick = removeRequired;
	gender_not.onclick = removeRequired;
*/
}

window.onload = init;
