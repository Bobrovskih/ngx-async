import { Observable, isObservable, SubscriptionLike } from 'rxjs';

export const likeObservable = (input: any) => {
    if (input instanceof Observable) {
        return true;
    }

    if (typeof isObservable === 'function' && isObservable(input)) {
        return true;
    }

    return false;
};

export const unsubscribe = (sub: SubscriptionLike | null) => {
    if (sub) {
        sub.unsubscribe();
        sub = null;
    }
};
