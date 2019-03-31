import * as utils from './utils';
import { Instances } from './instances';

const instances = new Instances();

export const Async: PropertyDecorator = (target: object, propertyKey: string | symbol) => {
    return Object.defineProperty(target, propertyKey, {
        get() {
            const instance = instances.get(this, propertyKey);
            if (instance) {
                return instance.value;
            }
        },
        set(input) {
            const instance = instances.add(this, propertyKey, input);

            if (utils.likeObservable(input)) {
                utils.unsubscribe(instance.subscription);
                instance.value = undefined;
                instance.subscription = input.subscribe((e: any) => instance.value = e);
            } else {
                instance.value = input;
                if (input === null) {
                    utils.unsubscribe(instance.subscription);
                    instances.remove(this, propertyKey);
                }
            }
        },
    });
};
