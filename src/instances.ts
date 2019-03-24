import { SubscriptionLike } from 'rxjs';

export interface Instance {
    self: any;
    value: any;
    subscription: SubscriptionLike | null;
}

export class Instances {
    private instances: Instance[] = [];

    public add(self: any, value: any) {
        const found = this.get(self);
        if (found) {
            return found;
        }
        const instance: Instance = {
            self,
            value,
            subscription: null,
        };
        this.instances.push(instance);
        return instance;
    }

    public get(self: any) {
        const instance = this.instances.find((item: any) => item.self === self);
        return instance;
    }

    public remove(self: any) {
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            if (instance.self === self) {
                this.instances.splice(i, 1);
                return;
            }
        }
        throw new Error('Cannot remove instance ' + JSON.stringify(self));
    }
}
