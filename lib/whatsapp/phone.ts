export function normalizeTurkishPhone(input: string): string | null {
  const digits = input.replace(/\D/g, '');

  let nationalNumber: string;

  if (digits.startsWith('90') && digits.length === 12) {
    nationalNumber = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    nationalNumber = digits.slice(1);
  } else if (digits.length === 10) {
    nationalNumber = digits;
  } else {
    return null;
  }

  if (!nationalNumber.startsWith('5') || nationalNumber.length !== 10) {
    return null;
  }

  return `+90${nationalNumber}`;
}
