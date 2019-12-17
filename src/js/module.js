export const disable = (disableEle, disableClass) => {
  if (disableEle.hasClass(disableClass))
    disableEle.removeClass(disableClass)
}

export const enable = (enableEle, enableClass, targetEle, targetAttr, bool) => {
  enableEle.toggleClass(enableClass)
  if (enableEle.hasClass(enableClass))
    targetEle.removeAttr(targetAttr);
  else
    targetEle.attr(targetAttr, bool);
}
