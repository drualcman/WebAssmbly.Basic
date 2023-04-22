//using WebAssembly Modulo
var wasmInstance;

const loadWasmModule = (wasmModule) => {
    return new Promise((resolve, reject) =>
    {
        if (wasmInstance) {
            resolve(wasmInstance);
        }
        else {
            fetch(wasmModule).then((response) => {
                // convert the file in arrayBuffer
                return response.arrayBuffer();
            }).then((wasmBuffer) => {
                // compile the code into a machile and module WASM instance
                return WebAssembly.instantiate(wasmBuffer);
            }).then(({ instance, module }) => {
                // execute the instance, module is the binary data compiled                
                wasmInstance = instance;
                console.log("wasm module loaded.")
                resolve(wasmInstance);
            }).catch((error) => {
                reject(error);
            });
        }
    });
}

function getFibonacciNumber(inputElementId) {
    let n = document.getElementById(inputElementId).value;
    loadWasmModule('/wasm/fibonachi2.wasm').then((instance) => {
        console.time("WASM");
        let result = instance.exports.fib(n);
        console.timeEnd("WASM");
        console.log(result);
    }).catch((e) => {
        console.timeEnd("WASM");
        console.error(e);
    });
}

function getFibonacciNumberJS(inputElementId) {
    let n = document.getElementById(inputElementId).value;
    console.time("JS");
    let result = fibJS(n);
    console.timeEnd("JS");
    console.log(result);
}

function fibJS(n) {
    if (n <= 1) return 1;
    return fibJS(n - 1) + fibJS(n - 2);
}
