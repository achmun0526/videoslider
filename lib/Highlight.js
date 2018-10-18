"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.range");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Highlight = function (_React$PureComponent) {
  _inherits(Highlight, _React$PureComponent);

  function Highlight() {
    var _temp, _this, _ret;

    _classCallCheck(this, Highlight);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.componentDidMount = function () {}, _this.handleLeftMouseDown = function () {
      var setResizingLeft = _this.props.setResizingLeft;

      setResizingLeft(true);
    }, _this.handleRightMouseDown = function () {
      var setResizingRight = _this.props.setResizingRight;

      setResizingRight(true);
    }, _this.renderCircles = function () {
      var _this$props = _this.props,
          resizeIndicatorCirclesCount = _this$props.resizeIndicatorCirclesCount,
          style = _this$props.resizeIndicatorCirclesStyle;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        (0, _lodash2.default)(resizeIndicatorCirclesCount).map(function (k, i) {
          return _react2.default.createElement("span", { className: "subclip__highlight--point", style: style, key: i });
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Highlight.prototype.render = function render() {
    var _props = this.props,
        endPartBounds = _props.endPartBounds,
        startPartBounds = _props.startPartBounds,
        containerBounds = _props.containerBounds;

    if (!startPartBounds || !endPartBounds || !containerBounds) return null;

    var right = containerBounds.width - endPartBounds.left + containerBounds.left - endPartBounds.width;

    var style = _extends({
      top: containerBounds.top + "px",
      bottom: containerBounds.bottom + "px",
      left: startPartBounds.left - containerBounds.left + "px",
      right: right + "px"
    }, this.props.highlightStyles);

    var leftWidth = startPartBounds.left - containerBounds.left + "px";
    var rightWidth = right;

    return _react2.default.createElement(
      "div",
      { className: "subclip__highlight--outer" },
      _react2.default.createElement("div", { className: "subclip__highlight--out", style: { left: 0, width: leftWidth } }),
      _react2.default.createElement(
        "div",
        { className: "subclip__highlight", style: style },
        _react2.default.createElement(
          "div",
          { onMouseDown: this.handleLeftMouseDown, className: "subclip__highlight--left" },
          _react2.default.createElement(
            "div",
            {
              className: "subclip__highlight__resize--inner",
              style: _extends({}, this.props.resizeIndicatorsStyle, this.props.resizeLeftIndicatorStyle)
            },
            this.renderCircles()
          )
        ),
        _react2.default.createElement(
          "div",
          { onMouseDown: this.handleRightMouseDown, className: "subclip__highlight--right" },
          _react2.default.createElement(
            "div",
            {
              className: "subclip__highlight__resize--inner",
              style: _extends({}, this.props.resizeIndicatorsStyle, this.props.resizeRightIndicatorStyle)
            },
            this.renderCircles()
          )
        )
      ),
      _react2.default.createElement("div", { className: "subclip__highlight--out", style: { right: 0, width: rightWidth } })
    );
  };

  return Highlight;
}(_react2.default.PureComponent);

exports.default = Highlight;
module.exports = exports["default"];