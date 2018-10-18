"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SubclipMarker = require("./SubclipMarker");

var _SubclipMarker2 = _interopRequireDefault(_SubclipMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThumbnailPart = function (_React$Component) {
  _inherits(ThumbnailPart, _React$Component);

  function ThumbnailPart() {
    var _temp, _this, _ret;

    _classCallCheck(this, ThumbnailPart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handlePartMouseEnter = function (e) {
      var _this$props = _this.props,
          setStartPartBounds = _this$props.setStartPartBounds,
          setEndPartBounds = _this$props.setEndPartBounds,
          resizingLeft = _this$props.resizingLeft,
          resizingRight = _this$props.resizingRight,
          setPreviewThumbBounds = _this$props.setPreviewThumbBounds,
          setPreviewShow = _this$props.setPreviewShow,
          setPreviewImg = _this$props.setPreviewImg,
          parent = _this$props.parent,
          parentBounds = _this$props.parentBounds,
          img = _this$props.img;


      _SubclipMarker2.default.refs.previewThumbBounds = parent;

      // handle preview img
      setPreviewThumbBounds(parentBounds);
      setPreviewShow(true);
      setPreviewImg(img.url);

      if (resizingLeft) {
        if (setStartPartBounds(_this.el.getBoundingClientRect(), Number(img.key))) _SubclipMarker2.default.refs.startPart = _this.el;
      }

      if (resizingRight) {
        if (setEndPartBounds(_this.el.getBoundingClientRect(), Number(img.key))) _SubclipMarker2.default.refs.endPart = _this.el;
      }
    }, _this.componentDidMount = function () {
      var _this$props2 = _this.props,
          play_position = _this$props2.play_position,
          img = _this$props2.img,
          startMarkerAt = _this$props2.startMarkerAt,
          endMarkerAt = _this$props2.endMarkerAt,
          setStartPartBounds = _this$props2.setStartPartBounds,
          setEndPartBounds = _this$props2.setEndPartBounds,
          setStartPartImg = _this$props2.setStartPartImg,
          setEndPartImg = _this$props2.setEndPartImg;


      if (img.key == play_position) {
        _SubclipMarker2.default.refs.previewPart = _this.el;
        _this.props.setPreviewPartBounds(_this.el.getBoundingClientRect());
      }

      if (img.key == startMarkerAt) {
        _SubclipMarker2.default.refs.startPart = _this.el;
        if (setStartPartBounds(_this.el.getBoundingClientRect(), Number(img.key))) setStartPartImg(img.url);
      }

      if (img.key == endMarkerAt) {
        _SubclipMarker2.default.refs.endPart = _this.el;
        if (setEndPartBounds(_this.el.getBoundingClientRect(), Number(img.key))) setEndPartImg(img.url);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ThumbnailPart.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var nImg = _ref.img,
        pp = _ref.play_position;
    var _props = this.props,
        img = _props.img,
        play_position = _props.play_position;

    return nImg.url !== img.url || Number(play_position) !== Number(pp);
  };

  ThumbnailPart.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
    var _props2 = this.props,
        play_position = _props2.play_position,
        img = _props2.img;

    if (Number(img.key) === Number(play_position)) {
      _SubclipMarker2.default.refs.previewPart = this.el;
      this.props.setPreviewPartBounds(this.el.getBoundingClientRect());
    }
  };

  ThumbnailPart.prototype.render = function render() {
    var _this2 = this;

    var img = this.props.img;

    return _react2.default.createElement("div", {
      "data-url": img.url,
      "data-time": img.key,
      ref: function ref(el) {
        _this2.el = el;
      },
      className: "subclip__thumbnail__part",
      onMouseEnter: this.handlePartMouseEnter,
      onMouseLeave: this.handlePartMouseLeave
    });
  };

  return ThumbnailPart;
}(_react2.default.Component);

exports.default = ThumbnailPart;
module.exports = exports["default"];