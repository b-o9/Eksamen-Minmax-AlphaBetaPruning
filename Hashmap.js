class HashMap {
  constructor() {
    this.map = new Map();
  }
  static serializeKey(key) {
    if (typeof key === 'object' && key !== null) {
      return JSON.stringify(key);
    }
    return String(key);
  }

  set(key, value) {
    const serializedKey = HashMap.serializeKey(key);
    this.map.set(serializedKey, value);
  }

  get(key) {
    const serializedKey = HashMap.serializeKey(key);
    return this.map.get(serializedKey);
  }

  has(key) {
    const serializedKey = HashMap.serializeKey(key);
    return this.map.has(serializedKey);
  }

  delete(key) {
    const serializedKey = HashMap.serializeKey(key);
    return this.map.delete(serializedKey);
  }

  get length() {
    return this.map.size; 
  }

  clear() {
    this.map.clear();
  }

  size() {
    return this.map.size;
  }

  entries() {
    return Array.from(this.map.entries()).map(([serializedKey, value]) => [JSON.parse(serializedKey), value]);
  }

  keys() {
    return Array.from(this.map.keys()).map(serializedKey => JSON.parse(serializedKey));
  }

  values() {
    return Array.from(this.map.values());
  }
}