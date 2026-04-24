export const isFiniteNumber = (input: unknown): input is number =>
  typeof input === 'number' && Number.isFinite(input);
