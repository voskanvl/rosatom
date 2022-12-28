export default function debounce(f: Function, ms: number) {
    let isCooldown = false;

    return function (...args: any) {
        if (isCooldown) return;

        f(...args);

        isCooldown = true;

        setTimeout(() => (isCooldown = false), ms);
    };
}
