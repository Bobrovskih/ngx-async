import { Observable } from 'rxjs';

export const Async = (target: object, propertyKey: string | symbol): PropertyDecorator => {
    let value: any;

    return Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (val) => {
            if (val instanceof Observable) {
                val.subscribe((v) => value = v);
            } else {
                value = val;
            }
        },
    });
};
