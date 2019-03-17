import { SubscriptionLike } from 'rxjs';

import * as utils from './utils';

export const Async: PropertyDecorator = (target: object, propertyKey: string | symbol) => {
    let value: any;
    let subscription: SubscriptionLike | null;

    return Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (input) => {
            if (utils.likeObservable(input)) {
                utils.unsubscribe(subscription);
                subscription = input.subscribe((e: any) => value = e);
            } else {
                value = input;
                if (input === null) {
                    utils.unsubscribe(subscription);
                }
            }
        },
    });
};
