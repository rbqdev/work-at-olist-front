export class Observable {

    createObservable(observable, { onGet, onSet }) {
        const interceptor = {
            get(target, key, receiver) {
                onGet(key)
                return target[key]
            },
            set(target, prop, value, receiver) {
                let reflectObj = Reflect.set(target, prop, value, receiver);
                onSet(prop, value, receiver)
                return reflectObj;
            }
        }
        return new Proxy(observable, interceptor)
    }

}