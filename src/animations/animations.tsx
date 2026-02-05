export const nrmlScaleUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  viewport: { once: true, amount: 0.3 },
});

export const nrmlVisible = (delay: number) => ({
  initial: { opacity: 0, y: 0 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  viewport: { once: true, amount: 0.3 },
});

export const nrmlLeft = (delay: number) => ({
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
  viewport: { once: true, amount: 0.3 },
});

export const nrmlRight = (delay: number) => ({
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
  viewport: { once: true, amount: 0.3 },
});
