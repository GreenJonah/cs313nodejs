function signIn() {
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;

 var params = {
    email: email,
    password: password
}
}

function displayNew(exLNewThickness, exRNewThickness
                   , inLNewThickness, inRNewThickness) {
              document.getElementById('exL').innerHTML = exLNewThickness;
              document.getElementById('exR').innerHTML = exRNewThickness;
              document.getElementById('inL').innerHTML = inLNewThickness;
              document.getElementById('inR').innerHTML = inRNewThickness;
}

function calculate(gap, specified, thickness) {
  shim = ((Number(gap) - Number(specified)) + Number(thickness));
  return shim.toFixed(4);
}

function getValues() {
  // Get Tolerance
  var exTolerance = document.getElementById('exTolerance').value;
  var inTolerance = document.getElementById('inTolerance').value;
  // Get exhaust shim specs
  var exLGap = document.getElementById('exLGap').value;
  var exRGap = document.getElementById('exRGap').value;
  var exLThickness = document.getElementById('exLThickness').value;
  var exRThickness = document.getElementById('exRThickness').value;
  // Get intake shim specs
  var inLGap = document.getElementById('inLGap').value;
  var inRGap = document.getElementById('inRGap').value;
  var inLThickness = document.getElementById('inLThickness').value;
  var inRThickness = document.getElementById('inRThickness').value;

  // Exhaust Left New Thickness
  var exLNewThickness = calculate(exLGap, exTolerance, exLThickness);
  // Exhaust Right New Thickness
  var exRNewThickness = calculate(exRGap, exTolerance, exRThickness);
  // Intake Left New Thickness
  var inLNewThickness = calculate(inLGap, inTolerance, inLThickness);
  // Intake Left New Thickness
  var inRNewThickness = calculate(inRGap, inTolerance, inRThickness);
  displayNew(exLNewThickness, exRNewThickness, inLNewThickness, inRNewThickness)
}
