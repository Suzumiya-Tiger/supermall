// 防抖和节流
export const debounce = function (func, delay) {
  let timer = null;
  let args = Array.prototype.slice.call(arguments);
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
