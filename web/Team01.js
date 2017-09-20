/* Team 01 js file */

function clicked() {
	alert("Clicked!");
}

function changeColor() {
	var newColor = document.getElementById("newColor");
	var div1     = document.getElementById("one");
   
    div1.style.backgroundColor = newColor.value;
}