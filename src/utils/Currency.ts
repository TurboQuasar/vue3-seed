export function toDecimal(x, n = 2) {
  const f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  let s = f.toFixed(n).toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + n) {
    s += '0';
  }
  return s;
}
