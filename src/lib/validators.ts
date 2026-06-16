export function isEmail(value: unknown): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function isRequired(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

export function minLength(value: unknown, length: number): boolean {
  return String(value ?? "").length >= length;
}
