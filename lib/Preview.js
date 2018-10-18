"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_React$PureComponent) {
  _inherits(Preview, _React$PureComponent);

  function Preview() {
    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      el: null
    }, _this.handleLoad = function () {
      requestAnimationFrame(function () {
        _this.forceUpdate();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Preview.prototype.render = function render() {
    var _extends2,
        _this2 = this;

    var _props = this.props,
        img = _props.img,
        boundTo = _props.boundTo,
        show = _props.show,
        containerBounds = _props.containerBounds,
        previewPosition = _props.previewPosition;

    if (!img || !boundTo || !containerBounds) return null;

    var left = boundTo.left - containerBounds.left;

    var max = Math.max,
        min = Math.min;

    var diff = 0;
    if (this.state.el) {
      var els = [this.state.el.getBoundingClientRect().width, boundTo.width];
      diff = (max.apply(undefined, els) - min.apply(undefined, els)) / 2;
      if (els[0] < els[1]) diff = -diff;
    }

    var space = this.props.spaceBtwPreviewAndSlider;

    var style = _extends((_extends2 = {}, _extends2[previewPosition == "bottom" ? "top" : "bottom"] = containerBounds.height + space, _extends2.left = left - diff + "px", _extends2.display = this.state.el ? "block" : "none", _extends2), this.props.previewStyle);

    var cn = show ? "subclip-preview--in" : "subclip-preview--out";

    return _react2.default.createElement(
      "div",
      {
        ref: function ref(el) {
          return _this2.setState({ el: el });
        },
        className: "subclip-preview " + cn,
        style: style
      },
      _react2.default.createElement("img", {
        src: img,
        alt: "preview",
        onLoad: this.handleLoad,
        style: this.props.imgPreviewStyle
      })
    );
  };

  return Preview;
}(_react2.default.PureComponent);

exports.default = Preview;
module.exports = exports["default"];