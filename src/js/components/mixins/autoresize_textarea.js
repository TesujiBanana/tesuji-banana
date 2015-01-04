"use strict";

module.exports = {
  _computeTextAreaHeight: function(el) {    
    var mirror = this._initMirror(el, el.parentNode);
    var scrollHeight = this._scrollMirror(mirror);
    this._destroyMirror(mirror);

    var styles = window.getComputedStyle(el);

    var lineHeight = parseInt(styles.lineHeight);
    var minHeight = parseInt(styles.minHeight);
    var maxHeight = parseInt(styles.maxHeight);
    
    var border = parseInt(styles.borderTop) + parseInt(styles.borderBottom);
    var padding = parseInt(styles.paddingTop) + parseInt(styles.paddingBottom);
    var calculatedHeight = lineHeight + scrollHeight + border + padding;

    if (calculatedHeight < minHeight) {
      return minHeight;
    } else if (calculatedHeight > maxHeight) {
      return maxHeight;
    } else {
      return calculatedHeight;
    }
  },
  _initMirror: function(el, parent) {
    var mirror = el.cloneNode(true);
    mirror.style.position = 'fixed';
    mirror.style.top = '-999px';
    mirror.value = el.value;
    parent.appendChild(mirror);
    return mirror;
  },
  _scrollMirror: function(mirror) {
    mirror.style.height = '0px';
    mirror.scrollTop = 0;
    mirror.scrollTop = 9999;
    return parseInt(mirror.scrollTop);
  },
  _destroyMirror: function(mirror) {
    var parent = mirror.parentNode;
    parent.removeChild(mirror);
  },
  _updateTextAreaHeight: function(el) {
    var textAreaHeight = this._computeTextAreaHeight(el);
    el.style.height = textAreaHeight + 'px';
  }
}
