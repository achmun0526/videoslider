"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SubclipMarker = require("./SubclipMarker");

var _Thumbnail = require("./Thumbnail");

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thumbnails = function (_React$Component) {
  _inherits(Thumbnails, _React$Component);

  function Thumbnails() {
    _classCallCheck(this, Thumbnails);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Thumbnails.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        thumbnails = _props.thumbnails,
        numberOfThumbnails = _props.numberOfThumbnails;
    // ...

    var thumbnailsArray = Object.keys(thumbnails).map(function (key) {
      return {
        key: key,
        url: thumbnails[key]
      };
    });

    var length = thumbnailsArray.length;
    var ratio = length / numberOfThumbnails;

    return _react2.default.createElement(
      _SubclipMarker.SubclipContext.Consumer,
      null,
      function (cProps) {
        return _react2.default.createElement(
          "div",
          { className: "subclip-thmbnails" },
          Array(_this2.props.numberOfThumbnails).fill().map(function (_, i) {
            return _react2.default.createElement(_Thumbnail2.default, _extends({
              key: thumbnailsArray[i].key,
              imgs: thumbnailsArray.slice(i * ratio, i * ratio + ratio)
            }, cProps, _this2.props));
          })
        );
      }
    );
  };

  return Thumbnails;
}(_react2.default.Component);

exports.default = Thumbnails;
module.exports = exports["default"];