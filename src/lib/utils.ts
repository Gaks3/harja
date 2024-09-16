/* eslint-disable @typescript-eslint/no-unused-vars */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const containsUppercase = (str: string) => /[A-Z]/.test(str);

export const containsNumber = (str: string) => /\d/.test(str);

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return specialChars.test(str);
};

export const isJSON = (text: string) => {
  if (typeof text !== "string") return false;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(text);
  } catch (error) {
    return false;
  }
};
