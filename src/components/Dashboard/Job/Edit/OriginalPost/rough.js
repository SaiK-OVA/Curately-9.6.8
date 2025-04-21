let array = [1, 2, 3]

for (let index = 0; index < array.length; index++) {
    console.log(array[index]);

}
let mularr1 = []
array.forEach((element, i) => {
    console.log(element);
    mularr1.push(element * 3);
});

let mularr = array.map((ele, i) => {
    return ele * 3;
})