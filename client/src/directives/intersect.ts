interface IIntersectOptions {
    ratio: number,
    callback: Function
}

const map: WeakMap<Element, Function> = new WeakMap();
const observer: IntersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
    });
});
