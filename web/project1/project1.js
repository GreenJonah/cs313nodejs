function login() {
	var first = document.getElementById('first').getAttribute('value');
	var pass  = document.getElementById('pass').getAttribute('value');
	var name  = document.getElementById('firstCheck').value;
	var password = document.getElementById('passwordCheck').value;
	
	if (name == first && password == pass)
	{
	    window.location = "edit.php";
	}
	else
	{	
		document.getElementById('notCorrect').classList.toggle('show');
	}
}
