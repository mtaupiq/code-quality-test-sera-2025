export function processData(a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any) {
  return a + b + c + d + e + f + g + h;
}

export function calculateDiscount(price: number) {
  if (price > 100) {
    return price * 0.15;
  } else if (price > 50) {
    return price * 0.1;
  } else if (price > 20) {
    return price * 0.05;
  }
  return 0;
}

export function validateEmail(email: string) {
  if (email.includes("@") && email.includes(".")) {
    return true;
  }
  return false;
}

export function checkEmail(email: string) {
  if (email.includes("@") && email.includes(".")) {
    return true;
  }
  return false;
}

export function verifyEmail(email: string) {
  if (email.includes("@") && email.includes(".")) {
    return true;
  }
  return false;
}

export function oldStyleFunction() {
  var x = 10;
  var y = 20;
  var result = x + y;
  return result;
}

// export function oldImplementation() {
//   console.log('This was the old way');
//   return 'deprecated';
// }

export const UNUSED_CONSTANT = "never used";
