export default function createHashMap(array, key, value = null) {
  return array.reduce((cur, next) => {
    return {
      ...cur,
      [next[key]]: value ? next[value] : next
    };
  }, {});
}