// eslint-disable-next-line no-unused-vars
const getRandomInteger=(min, max)=> {
  // случайное число от min до (max+1)
  const integerRand = min + Math.random() * (max + 1 - min);
  return Math.floor(integerRand);
};

// eslint-disable-next-line no-unused-vars
const getRandomNumber=(min, max)=> {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return rand;
};
