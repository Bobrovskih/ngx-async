import { SubscriptionLike } from 'rxjs';

export interface Instance {
    self: any;
    property: string | symbol;
    value: any;
    subscription: SubscriptionLike | null;
}

export class Instances {
    private instances: Instance[] = [];

    public add(self: any, property: string | symbol, value: any) {
        const found = this.get(self, property);
        if (found) {
            return found;
        }
        const instance: Instance = {
            self,
            property,
            value,
            subscription: null,
        };
        this.instances.push(instance);
        return instance;
    }

    public get(self: any, property: string | symbol) {
        const instance = this.instances.find((item: any) =>
            item.self === self &&
            item.property === property);
        return instance;
    }

    public remove(self: any, property: string | symbol) {
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            if (instance.self === self && instance.property === property) {
                this.instances.splice(i, 1);
                return;
            }
        }
        throw new Error('Cannot remove instance ' + JSON.stringify(self));
    }
}
