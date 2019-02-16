import { Observable } from 'rxjs';

export const Async: PropertyDecorator = (target: object, propertyKey: string | symbol) => {
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
