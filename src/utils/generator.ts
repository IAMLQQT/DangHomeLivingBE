import { customAlphabet } from 'nanoid';
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nanoid = customAlphabet(alphabet, 24);

export function generateId(): string {
  return nanoid();
}