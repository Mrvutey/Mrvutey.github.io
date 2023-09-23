var loginObj = {
    loginAction: function(){
        let txtUsername = document.getElementById('txtUsername').value;
        let txtPassword = document.getElementById('txtPassword').value;
        console.log(this.Username)
        if('patvutey@gmail.com' == txtUsername && 'Tey123' == txtPassword){
            document.getElementById('msg').remove();
            sessionStorage.setItem("Username",txtUsername);
            window.location.href = "report.html";
        } else {
            alert ('Incorrect username or password');
        }
        
    }
}



let btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', loginObj.loginAction);