export const range = (from: number, to: number): number[] => {
  const response = [];

  for (let i = from; i <= to; i++) {
    response.push(i);
  }

  return response;
};
