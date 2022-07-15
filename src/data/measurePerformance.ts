const PRECISION = 4; // 4 sig-figs
export const measurePerformance = performance ? (tag: string, func: Function) => {
    const start = performance.now();
    func();
    const duration = performance.now() - start;
    console.log(`${tag}${duration.toPrecision(PRECISION)}ms`);
} : (_tag: string, func: Function)=>func();
