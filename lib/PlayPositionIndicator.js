"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayPositionIndicator = function (_React$PureComponent) {
  _inherits(PlayPositionIndicator, _React$PureComponent);

  function PlayPositionIndicator() {
    _classCallCheck(this, PlayPositionIndicator);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  PlayPositionIndicator.prototype.render = function render() {
    var _props = this.props,
        previewPartBounds = _props.previewPartBounds,
        _props$playPositionIn = _props.playPositionIndicatorStyles,
        style = _props$playPositionIn === undefined ? {} : _props$playPositionIn,
        containerBounds = _props.containerBounds;

    if (!previewPartBounds || !containerBounds) return null;
    var left = previewPartBounds.left - containerBounds.left;
    return _react2.default.createElement(
      "div",
      { style: _extends({}, style, { left: left + "px" }), className: "subclip-marker" },
      _react2.default.createElement("div", null)
    );
  };

  return PlayPositionIndicator;
}(_react2.default.PureComponent);

exports.default = PlayPositionIndicator;
module.exports = exports["default"];