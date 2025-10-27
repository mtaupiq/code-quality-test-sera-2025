// Validation interfaces
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface UserTypeInfo {
  userType: string;
  discount: number;
  points: number;
}

// User validation functions
export function validateName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, error: "Name required" };
  }
  
  if (name.length <= 2) {
    return { isValid: false, error: "Name too short" };
  }
  
  if (name.length >= 50) {
    return { isValid: false, error: "Name too long" };
  }
  
  const forbiddenWords = ["admin", "root", "system"];
  for (const word of forbiddenWords) {
    if (name.includes(word)) {
      return { isValid: false, error: `Invalid name: ${word}` };
    }
  }
  
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: "Email required" };
  }
  
  if (!email.includes("@")) {
    return { isValid: false, error: "Email missing @" };
  }
  
  if (!email.includes(".")) {
    return { isValid: false, error: "Email missing domain" };
  }
  
  if (email.length <= 5) {
    return { isValid: false, error: "Email too short" };
  }
  
  if (email.length >= 100) {
    return { isValid: false, error: "Email too long" };
  }
  
  if (email.includes(" ")) {
    return { isValid: false, error: "Email contains spaces" };
  }
  
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: "Password required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: "Password too short" };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()]/.test(password);
  
  if (!hasUpperCase) {
    return { isValid: false, error: "Password needs uppercase" };
  }
  
  if (!hasLowerCase) {
    return { isValid: false, error: "Password needs lowercase" };
  }
  
  if (!hasNumber) {
    return { isValid: false, error: "Password needs number" };
  }
  
  if (!hasSpecialChar) {
    return { isValid: false, error: "Password needs special character" };
  }
  
  return { isValid: true };
}

export function validateAge(age: any): ValidationResult {
  if (!age) {
    return { isValid: true }; // Age is optional
  }
  
  const numericAge = typeof age === "number" ? age : parseInt(age);
  
  if (isNaN(numericAge)) {
    return { isValid: false, error: "Age must be a number" };
  }
  
  if (numericAge < 18) {
    return { isValid: false, error: "Must be 18 or older" };
  }
  
  if (numericAge > 120) {
    return { isValid: false, error: "Age too high" };
  }
  
  return { isValid: true };
}

export function calculateUserType(age: number, referralCode?: string, marketingConsent?: any, newsletterConsent?: any): UserTypeInfo {
  let userType = "regular";
  let discount = 0;
  let points = 0;

  // Age-based type calculation
  if (age >= 18 && age < 25) {
    userType = "young_adult";
    discount = 10;
    points = 100;
  } else if (age >= 25 && age < 35) {
    userType = "adult";
    discount = 5;
    points = 50;
  } else if (age >= 35 && age < 50) {
    userType = "mature";
    discount = 7;
    points = 75;
  } else if (age >= 50 && age < 65) {
    userType = "senior";
    discount = 15;
    points = 150;
  } else if (age >= 65) {
    userType = "elderly";
    discount = 20;
    points = 200;
  }

  // Referral code bonuses
  if (referralCode && referralCode.length === 8) {
    if (referralCode.startsWith("REF")) {
      points += 500;
      discount += 5;
    } else if (referralCode.startsWith("VIP")) {
      points += 1000;
      discount += 10;
    } else if (referralCode.startsWith("NEW")) {
      points += 250;
      discount += 3;
    }
  }

  // Consent bonuses
  if (marketingConsent === "yes" || marketingConsent === true) {
    points += 50;
  }

  if (newsletterConsent === "yes" || newsletterConsent === true) {
    points += 25;
  }

  return { userType, discount, points };
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
