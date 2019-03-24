import { SubscriptionLike } from 'rxjs';

export interface Instance {
    self: any;
    value: any;
    subscription: SubscriptionLike | null;
}

export class Instances {
    private instances: Instance[] = [];

    public add(self: any, value: any) {
        if (this.has(self)) {
            return;
        }
        const instance: Instance = { self, value, subscription: null };
        this.instances.push(instance);
    }

    public get(self: any) {
        const instance = this.instances.find((item: any) => item.self === self);
        if (!instance) {
            throw new Error('Cannot find instance ' + JSON.stringify(self));
        }
        return instance;
    }

    public remove(self: any) {
        this.instances = this.instances.filter((instance) => instance.self === self);
    }

    private has(self: any): boolean {
        return this.instances.some((instance) => instance.self === self);
    }
}
