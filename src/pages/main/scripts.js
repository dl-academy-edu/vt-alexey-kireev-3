// ДЗ 1
// const name = prompt ('Введите имя:');
// const surname = prompt ('Введите фамилию:');
// const age = prompt ('Введите возраст:');

// let user = {
//     name: name,
//     Surname: surname,
//     age: age,
// };

// console.log(user);

// ДЗ 2 (1 задача)
// let num;
// do {
//     num = +prompt('Введите число');
// } while(isNaN(num))

// for (let i = 0; i <= num; i++) {
//     if((i % 4) === 0) {
//         continue;
// }

// {
//        +alert(i);
//  }

// if ( !parseInt(i) ) {
//             alert ('Это не число');
//             } 
// }
// console.log(i);


// ДЗ 2 (2 задача)
// let n = prompt("Введите число для вычисления его факториала");
// let x = 1;
// let i = 2;
// if (n != null) {
// function factor(n) {
// while(i <= n) {
// x = x * i;
// i++;
// }
// return x;
// }


// if (n < 0) {
// while (n < 0){
// n = prompt("Введите число больше либо равно нулю для вычисления факториала. Факториала отрицательного числа не существует");
// }
// document.write(factor(n));
// }
// else {
// document.write(factor(n));
// }

// if ( !parseInt(n) ) {
//     alert ('Это не число');
//     } 

// }

// console.log(n)

// //ДЗ 2 (3 задача)
// let x = +prompt("Введите число: ");
// let y = +prompt("Введите степень: ");
// let z = x;

// for (let i=1; i<y; i++)  {
//     z = x ** y;
//     };
//     {
//         alert(z);
//     }

//     if ( !parseInt(z) ) {
//         alert ('Это не число');
//         } 
// console.log(z);


// ДЗ 2 (4) 
// let rand = Math.floor(1 + Math.random() * 10);
// let number = prompt("Угадайте число", "");



// if (rand == number) {
//     alert("Вы угадали, это было: " + rand); rand++;
// }
// else if (rand !== number) {
//     prompt("Неугадал") ; rand++;
// }
// else if( number == rand){
//     rand++;}
// if (!parseInt(number)) {
//     alert('Это не число'); rand++;
// }

// console.log(rand);
// console.log(number);