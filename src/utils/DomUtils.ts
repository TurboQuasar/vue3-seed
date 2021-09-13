/**
 * 禁止表单自动填充
 * @param val {HTMLElement}
 *  readonly onfocus="this.removeAttribute('readonly')"
 */
export function forbidFormFill(val: HTMLElement) {
  val.querySelectorAll('input').forEach((_) => {
    _.setAttribute('readonly', 'readonly');
    _.onfocus = function () {
      _.removeAttribute('readonly');
    };
  });
}
