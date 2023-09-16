let x = 5;
let y = 2;
let z = x * y;
document.getElementById("demo").innerHTML = z;
let a = 5;
a++;
let b = a;
document.getElementById("demo1").innerHTML = b;
let c = 5;
c--;
let d = c;
document.getElementById("demo2").innerHTML = d;
let e = 10;
e += 5;
document.getElementById("demo3").innerHTML = "Value of x is: " + e;
let f = 10;
f -= 5;
document.getElementById("demo4").innerHTML = "Value of x is: " + f;
let g = 10;
g %= 5;
document.getElementById("demo5").innerHTML = "Value of x is: " + g;
let text ="these are my eyes";
document.getElementById("demo6").innerHTML = text.length;
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"'; 

document.getElementById("demo7").innerHTML =
answer1 + "<br>" + answer2 + "<br>" + answer3;
let h = 5;
document.getElementById("demo8").innerHTML = (x === 5);
let i = 6;
let j= 3;
document.getElementById("demo9").innerHTML = 
(i < 10 && j > 1) + "<br>" + 
(i < 10 && j < 1);
