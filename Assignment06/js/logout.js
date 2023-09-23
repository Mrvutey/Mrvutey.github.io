var loginObj = {
    loginAction: function(){
        let txtEmail = document.getElementById('txtEmail').value;
        let txtPassword = document.getElementById('txtPassword').value;
        console.log(this.email)
        if('patvutey@gmail.com' == txtEmail && 'Tey123' == txtPassword){
            document.getElementById('msg').remove();
            // localStorage.setItem("email","txtUsername");
             window.location.href = "login.html";
        } else {
            alert ('Incorrect username or password');
        }
        
    }
}



let btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click', loginObj.loginAction);

// let logout = document.getElementById('logout-btn');
// logout.addEventListener('click',function(){
//     alert(logout.html);
// })