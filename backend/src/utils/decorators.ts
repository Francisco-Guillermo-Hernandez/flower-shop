
export const DynamicConstructor = () => {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
                    Object.assign(this, args[0]);
                }
            }
        }
    }
}