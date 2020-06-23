export function makeIdCounter(idx) {
  let id=idx;
  return function() {
    return id++;
  }
}
