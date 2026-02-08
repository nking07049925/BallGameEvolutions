export const dictify = <TValue, TKey>(
  data: TValue[],
  getKey: (obj: TValue) => TKey,
) => new Map(data.map((obj) => [getKey(obj), obj]));

export const groupBy = <TValue, TKey>(
  data: TValue[],
  getKey: (obj: TValue) => TKey,
) => {
  const dict = new ArrayDict<TKey, TValue>();
  data.forEach((obj) => dict.add(getKey(obj), obj));
  return dict;
};

export const unique = <T>(data: T[]) => [...new Set(data)];

export class ArrayDict<TKey, TValue> {
  private map: Map<TKey, TValue[]> = new Map();
  set(key: TKey, value: TValue[]) {
    this.map.set(key, value);
    return this;
  }
  add(key: TKey, value: TValue) {
    let arr = this.map.get(key);
    if (!arr) {
      arr = [];
      this.map.set(key, arr);
    }
    arr.push(value);
    return this;
  }
  get(key: TKey) {
    return this.map.get(key);
  }
  keys() {
    return this.map.keys();
  }
  has(key: TKey) {
    return this.map.has(key);
  }
}

export class Map2<Key1, Key2, Value> {
  private map: Map<Key1, Map<Key2, Value>> = new Map();
  has(key1: Key1) {
    return this.map.has(key1);
  }

  has2(key1: Key1, key2: Key2) {
    return !!this.map.get(key1)?.has(key2);
  }

  get(key1: Key1, key2: Key2) {
    return this.map.get(key1)?.get(key2);
  }
  set(key1: Key1, key2: Key2, value: Value) {
    let innerMap = this.map.get(key1);
    if (!innerMap) {
      innerMap = new Map();
      this.map.set(key1, innerMap);
    }
    innerMap.set(key2, value);
    return this;
  }
  keys() {
    return this.map.keys();
  }
  keys2(key1: Key1) {
    return this.map.get(key1)?.keys();
  }
}
