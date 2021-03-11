import { exit } from "process";

export function yesterday() {
  return dayBefore(new Date());
}

export function dayBefore(date: Date) {
  // Dates are mutable in js
  const copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return copy;
}

export function failAndExit(message: string, exitCode: number = 1) {
  console.error(message);
  process.exit(exitCode);
}

export function parseDateString(dateString: string) {
  if(dateString.match(/^\d{8}$/)) {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6));
    const day = parseInt(dateString.substring(6, 8));

    // Remember that JS Date objects use a 0-indexed month
    return new Date(year, month - 1, day);
  } else {
    return new Date(dateString);
  }
}
