export default function createHashMap(array, key) {
  return array.reduce((cur, next) => {
    return {
      ...cur,
      [next[key]]: next
    };
  }, {});
}