function getRandomInteger(min, max) {
  // случайное число от min до (max+1)
  let integerRand = min + Math.random() * (max + 1 - min);
  return Math.floor(integerRand);
}

alert( getRandomInteger(9, 900) );

function getRandomNumber(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return rand;
}

alert(getRandomNumber(8, 27))
