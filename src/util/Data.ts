export const dictify = <TValue, TKey>(
  data: TValue[],
  getKey: (obj: TValue) => TKey,
) => new Map(data.map((obj) => [getKey(obj), obj]));
export const groupBy = <TValue, TKey>(
  data: TValue[],
  getKey: (obj: TValue) => TKey,
) => {
  const map = new Map<TKey, TValue[]>();
  data.forEach((obj) => {
    const key = getKey(obj);
    let arr = map.get(key);
    if (!arr) {
      arr = [];
      map.set(key, arr);
    }
    arr.push(obj);
  });
  return map;
};

export class Map2<Key1, Key2, Value> {
  private map: Map<Key1, Map<Key2, Value>> = new Map();
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
}
