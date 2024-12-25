class Random {
    constructor(seed) {
        this.seed = seed;
    }

    next() {
        // A simple deterministic PRNG (e.g., Lehmer RNG)
        const a = 1664525;
        const c = 1013904223;
        const m = 2 ** 32;
        this.seed = (a * this.seed + c) % m;
        return this.seed / m;
    }
}

export default Random;