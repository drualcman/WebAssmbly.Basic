function calc(stlib, foreign, heap) {
    "use asm"
    function add(a, b) {
        a = a | 0.0;
        b = b | 0.0;
        return (a + b) | 0.0;
    }
    return {
        add: add
    }
}

var stdlib = null;
var foreign = null;
var heap = new ArrayBuffer(1024);

var calcInstance = calc(stdlib, foreign, heap);
var result = calcInstance.add(3, 30);

let element = document.getElementById("output");
element.innerHTML = result;