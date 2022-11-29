export function useRandom() {
    const random = (min: number = 0, max: number = 100) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    return {
        random,
    }
}
