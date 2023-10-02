function init(){
    const one = document.createElement('div');
    one.innerHTML = "i'm watching you";

    one.style.position = "fixed";
    one.style.bottom = "20px";
    one.style.right = "20px";
    one.style.fontSize = "50px";
    one.style.color = "white";
    one.style.zIndex = "999999";

    document.body.appendChild(one);

    console.log("Injected!")
}

init();