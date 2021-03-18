// ДЗ 2 (1 задача)
 
// let num = prompt("Введите число");

// if(Number.isNaN(num)) {
//     alert("Введите число")
// } else {
//     for (let i = 1; i <= num; i++) {
//         if (i % 4 === 0) {
//             continue;
//         }
//         else {
//             alert(i);
//         }
//     }
// };


// // ДЗ 2 (2 задача)
 
// let number = +(prompt('Введите число для нахождения факториала'));
// let i=1;
// let factorial = 1;

// if(Number.isNaN(number)) {
//     alert ('Ввведено некорректное число');
// } else if (number<0) {
//     alert ('Введено отрицательное число');
// } else { 
//     while (i<number+1) {
//         factorial*=i;
//         i+=1;
//     }    
//     alert('Факториал равен: ' + factorial);
// };


// ДЗ 2 (3 задача)
// let x = +prompt("Введите число: ");
// let y = +prompt("Введите степень: ");
// let z = x;

// if(Number.isNaN(x + y)) {
//     alert("Введите число");
// } else {
// for (let i=1; i<y; i++);  {
//     z = x ** y; };
//     {
//         alert(z);
//     };
// }

// ДЗ 2 (5) 
// let rand = Math.floor(1 + Math.random() * 10);
// let number = prompt("Угадайте число", "");

// open();
// function open() {
// if (rand == number) {
//     alert("Вы угадали, это было: " + rand);
// }
// else if (rand !== number) {
//     alert("Неугадал") ; 
//     number = prompt('Угадайте число:');
//     open();
// }
// else if( number == rand){
//     }
// };
// console.log(rand);
// console.log(number);