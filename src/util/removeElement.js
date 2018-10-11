export default function removeElement(array, el) {
  array = array.splice(0);
  return array.filter(arEl => arEl != el);
}