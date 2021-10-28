'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//const movements=[200, 450, -400, 3000, -650, -130, 70, 1300]
//movements.forEach(function(mov, i){//mov -current element
 // console.log(`${mov} , ${i}`);


  
//});


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

 const displayMovements = function(movements)
 {
   containerMovements.innerHTML = '';//clear all movements at the begining

 movements.forEach(function(mov, i){//mov -current element; movements - an array with value
 const type = mov >0 ? 'deposit': 'withdrawal';
 const html =`
  <div class="movements__row">
           <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}</div>
          </div>`;

     containerMovements.insertAdjacentHTML('afterbegin', html);

  });
};
displayMovements(account1.movements);
//create user names abbreviation
const createUserNames = function (arr_with_account) {

  //abbreviation
  arr_with_account.forEach(function(one_acc){
    one_acc.username = one_acc.owner
    .toLowerCase()
    .split(' ')
    //Arrow function
    .map(name => name[0])
    /*.map(function(name)
    {
      return name[0];
    
    })*/
    .join('');
    //return username;
  })
  //const user = 'Steven Thomas Williams'; //i need stw
  //const username = user
    
}
createUserNames(accounts);
console.log(accounts);
const calcDisplayBalance =function(movements){
  const balance=movements.reduce((acc,mov)=>acc+mov,0);
  labelBalance.textContent=`${balance} PLN`;
}
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(movements){
  //incomes
  const incomes = acc.movements
  .filter(mov => mov>0)
  .reduce((acc, mov) => acc + mov,0 );
  labelSumIn.textContent = ` ${incomes}pln`;
//outcomes
const outcomes = acc.movements
.filter(mov => mov<0)
.reduce((acc, mov) => acc + mov,0 );
labelSumOut.textContent = ` ${outcomes}pln`;
//intrest 1.2% of deposited amount of money
const intrest = acc.movements
.filter(mov=>mov>0)
.map(deposit=>(deposit*1.2/100))
.reduce((acc,inter)=>acc+inter,0);
labelSumInterest.textContent = ` ${intrest}pln`;
}
calcDisplaySummary(account1.movements);

let currentAccount;
btnLogin.addEventListener('click', function(e){
  //prevent form from permitting
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount.pin===Number(inputLoginPin.value)){
    console.log('LOGIN OK');
    //display UI and welcome message
     labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
     containerApp.style.opacity=100;
    //display movments for particular acc
    displayMovements(currentAccount.movements);
    // display balance
    calcDisplayBalance(currentAccount.movements);
    //display movements
    calcDisplayBalance(currentAccount.movements);
    //clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
  }
})

//the find method
/*const firstWithdrawal = movements.find(mov=>mov<0);
console.log(movements);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner==='Jessica Davis');
console.log(account);
*/
 
/*createUserNames(accounts)
console.log(accounts);

const deposits = movements.filter(function (mov){
  return mov >0;
});
console.log(movements);
console.log(deposits);

 //2.0
const arr=[];
for(const mov of movements){
  if(mov>0)arr.push(mov);
}
console.log(arr);

const withdrawals=movements.filter(mov => mov<0);
console.log(withdrawals);

//reduce

//accumulator = snowball

//cur -current i
const balance = movements.reduce(function(acc,cur, i, arr){
  console.log(`Iteration ${i}: ${acc}`);
  return acc +cur
}, 0);
console.log(balance);
const balance2 = movements.reduce((acc,cur)=>acc+cur,0);
console.log(balance2);
/*const euro =[10,20,30]
const euroToUsd = 1.1;
const newArrayUsd = euro.map(function(currentElement)
{
  return currentElement * euroToUsd;
})
console.log(euro);
console.log(newArrayUsd);
//option2
const newArrayUsd2 =[];
for(const ce of euro)
newArrayUsd2.push(ce*euroToUsd);
console.log(newArrayUsd2);
 
// =>arrow function
const newArrayUsd3 = euro.map(ce => ce * euroToUsd);
console.log(newArrayUsd3);

const descriptionArray =euro.map((ce,i,arr )=>{
if(ce>0) {
  return`current element nr ${i+1} has value = ${ce}`;}
  else {return`current element nr ${i+1} has value [withdrew] = ${ce}`;}

});
console.log(descriptionArray);
 

const descriptionArray2 =euro.map((ce,i,arr )=>
  `current element nr ${i+1} has value ${ce>0 ? `${ce}`: ` [withdrew]=${ce}`
}`

);
console.log(descriptionArray2);

*/