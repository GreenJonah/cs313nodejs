function signIn() {
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;

 var params = {
    email: email,
    password: password
}

removeChildren('login');

$.post("/login", params, function(result) {
  if (result.success != false) {
    var success = `<p class='success'>Success</p>`;
    document.getElementById('login').insertAdjacentHTML('beforeend', success);
    loadBikes(result.id);
  } else {
    var success = `<p class='invalid'>Invalid Email or Password</p>`;
    document.getElementById('login').insertAdjacentHTML('beforeend', success);
  }
});
}

function addUser(){
  console.log('hello');
  var userName = document.getElementById('userName').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (userName == '' || email == '' || password == '') {
    return;
  }

  var params = {
    userName: userName,
    email: email,
    password: password
  }

  $.post("/addUser", params, function(result) {
    if (result.success != false) {
      console.log('Success');
      window.location.href = 'calculate.html';
    } else {
      console.log('Failed to create account');
    }
  });

}

function removeChildren(id) {
  var i = 0;
  // Remove all of the previous children
  var myNode = document.getElementById(id);
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
}

function addBike(id){
  var bikeName = document.getElementById('newBikeName').value;
  var params = {
    id: id,
    bikeName: bikeName
  }

  $.post("/addBike", params, function(results) {
    if (result.success != false) {
      getBikes(id);
    } else {
      console.log('failed to add bike');
    }
  });
}

function getBikes(id) {
  var params = {
     id: id
 }
  var results = ''
  $.get("/getBike", params, function(result) {
    if (result.success != false) {
      results = result;
    } else {
      return;
    }
  });
  console.log("hello" + results);
  return results;
}

function loadBikes(id) {
  removeChildren('bikeSelect');
  var bikes = getBikes(id);
  //console.log(bikes);
  var selectBike = `<p class="subTitle">Select a Bike</p>
                    <select class=input>
                    </select><br/><br/>
                    <input class='subInput' id='newBikeName' placeholder='New Bike Name'>
            				<button class='btn' onclick='addBike(${id})'>Add bike to list</button>`
  document.getElementById('bikeSelect').insertAdjacentHTML('beforeend', selectBike);
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
