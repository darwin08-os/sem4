var input = document.getElementById("input")
var error = document.getElementById("error")
var res = document.getElementById("start")
var over = true
var num = 0
window.addEventListener("reload",function(){
    document.getElementById('submit').blur()
})
let sub=()=>{
    if (over == true){
        document.getElementById('submit').blur()
    }
    else {
        document.getElementById('submit')
        if (parseInt(input.value)===num){
            let inter1 = setInterval(function (){error.innerHTML = "press start to play the game"},5000);
            error.innerHTML = "You guessed currect " + num
            over=true
            setTimeout(()=>{
                clearInterval(inter1)
            },5000)
        }else{
            parseInt(input.value)>num ?  error.innerHTML = "guess lower" : error.innerHTML = "guess higher"
            let inter2 = setInterval(function (){error.innerHTML = " "},2000);
            setTimeout(()=>{
                clearInterval(inter2)
            },2000)   
        }
    }    
}
let start=()=>{
    num = Math.floor(Math.random() * 100)
    error.innerHTML = "Guss the number!!"
    over = false
    //to show timer
    var sec = 59
    let se = setInterval(()=>{
        document.getElementById("time").innerHTML = sec
        sec--;
    },1000)
    setTimeout(()=>{
        clearInterval(se)
        over=true
        error.innerHTML = "you run out of time out"
    },60000)
    
}