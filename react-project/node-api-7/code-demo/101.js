// variable | data type (base javascript)
var Uesername = "admin";
var Gender = "Male";
var Tel = "096666666";
var Salary = 999.99;
var Age = 32;

// Condition if, if else, if else if
var avg = 89.99;
if(avg < 50){
    console.log("Fail")
}else{
    console.log("pass")
}
// loop for, while , do while , map forEach,...
console.log("=====For Loop=====")
for(var i = 0; i < 10 ; i++){
    console.log(i);
}
// array 
    console.log("==== Array ====")
    var course = ["C++","C#","Java"];
    // access element 
    console.log(course[0]);
    console.log(course[2]);
    // lenght
    console.log(course.length);
    // list all emlement from array
    for(var i = 0; i < course.length ; i ++){
        console.log(course[i]);
    }

// function
console.log("===== Test function =====");
function getUsername(name){
    return "My name is "+name;
} 

function sum(x,y){
    return x + y;
}

var myName = getUsername("Sok"); // call function
var myName2 = getUsername("Lyly");
console.log(myName);
console.log(myName2);

var mySum1 = sum(100,200);
console.log(mySum1);


console.log("Name = "+Uesername);
console.log("Gender = "+Gender);
console.log("Tel = "+Tel);
console.log("Salary = "+Salary);
console.log("Age = "+Age);