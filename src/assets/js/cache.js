import storage from 'good-storage'


const CACHE_KEY = '_wh_'


export function loadData() {
  return storage.get(CACHE_KEY, {})
}

export function saveCatch(key, val) {
  let data = storage.get(CACHE_KEY, {})
  data[key] = val
  storage.set(CACHE_KEY, data)
  return data
}
