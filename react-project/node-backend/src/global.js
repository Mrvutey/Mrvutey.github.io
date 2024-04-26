var X = 100;
var Y = 50;
var PI = 3.14;

function sum(a,b){
    return a + b;
}

function getGradByAge(avg){
    if(avg >= 90 && avg <= 100){
        return "A";
    }else if(avg >= 80 && avg < 90){
        return "B";
    }else if(avg >= 70 && avg < 80){
        return "C";
    }else if(avg >= 60 && avg < 70){
        return "D";
    }else if(avg >= 50 && avg < 60){
        return "E";
    }else{
        return "F";
    }
}

function getDiscount(){

}

function getCalTax(){

}


module.exports = {X,Y,sum,PI,getGradByAge};