function isPrime(num) {
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 2) {
    return false;
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

module.exports = { isPrime };