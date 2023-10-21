console.log("in login js");
function handleLogin(e){
    e.preventDefault();
    const email=document.forms["myFormlogin"]["email"].value;
    const password=document.forms["myFormlogin"]["password"].value;
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    const user=JSON.parse(localStorage.getItem("user"));
    if(user.email!=email||user.password!=password){
        alert("email ro password do not match");
        return;
    }
    alert("Login SuccessFul");
}
function handleSignUp(event) {
    event.preventDefault();

    const name = document.forms["myForm"]["name"].value;
    const email = document.forms["myForm"]["email"].value;
    const password = document.forms["myForm"]["password"].value;
    const confirmPassword = document.forms["myForm"]["confirmPassword"].value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
    }
    const user = {
        name: name,
        email: email,
        password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Sign up successful!");
}