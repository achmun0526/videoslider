"use strict";

exports.__esModule = true;
exports.SubclipContext = undefined;

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.debounce");

var _lodash2 = _interopRequireDefault(_lodash);

var _Thumbnails = require("./Thumbnails");

var _Thumbnails2 = _interopRequireDefault(_Thumbnails);

var _Highlight = require("./Highlight");

var _Highlight2 = _interopRequireDefault(_Highlight);

var _PlayPositionIndicator = require("./PlayPositionIndicator");

var _PlayPositionIndicator2 = _interopRequireDefault(_PlayPositionIndicator);

var _Preview = require("./Preview");

var _Preview2 = _interopRequireDefault(_Preview);

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubclipContext = exports.SubclipContext = _react2.default.createContext();

var SubclipMarker = (_temp2 = _class = function (_React$Component) {
  _inherits(SubclipMarker, _React$Component);

  function SubclipMarker() {
    var _temp, _this, _ret;

    _classCallCheck(this, SubclipMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      error: null,
      errorInfo: null,
      // state.
      containerBounds: null,
      previewPartBounds: null,
      endPartBounds: null,
      startPartBounds: null,

      previewThumbBounds: null,

      previewShow: false,
      previewImg: null,

      startPartImg: null,
      endPartImg: null,

      defaultStartAt: _this.props.startAt,
      defaultEndAt: _this.props.endAt,

      startAt: _this.props.startAt,
      endAt: _this.props.endAt,

      // mutators.
      setContainerBounds: function setContainerBounds(containerBounds) {
        return _this.setState({ containerBounds: containerBounds });
      },
      setPreviewThumbBounds: function setPreviewThumbBounds(previewThumbBounds) {
        return _this.setState({ previewThumbBounds: previewThumbBounds });
      },
      setPreviewPartBounds: function setPreviewPartBounds(previewPartBounds) {
        return _this.setState({ previewPartBounds: previewPartBounds });
      },

      setPreviewShow: function setPreviewShow(previewShow) {
        return _this.setState({ previewShow: previewShow });
      },
      setPreviewImg: function setPreviewImg(previewImg) {
        return _this.setState({ previewImg: previewImg });
      },
      setStartPartImg: function setStartPartImg(startPartImg) {
        return _this.setState({ startPartImg: startPartImg });
      },
      setEndPartImg: function setEndPartImg(endPartImg) {
        return _this.setState({ endPartImg: endPartImg });
      },

      setStartPartBounds: function setStartPartBounds(startPartBounds, startAt) {
        var endAt = _this.state.endAt;


        if (endAt - startAt < _this.props.minimum_marked_length) {
          return false;
        }
        _this.setState({ startPartBounds: startPartBounds, startAt: startAt });
        if (_this.props.highlightUpdated) _this.props.highlightUpdated(startAt, endAt);
        if (_this.props.onStartMarkChagned) _this.props.onStartMarkChagned(startAt);
        return true;
      },

      setEndPartBounds: function setEndPartBounds(endPartBounds, endAt) {
        var startAt = _this.state.startAt;

        if (endAt - startAt < _this.props.minimum_marked_length) {
          return false;
        }

        _this.setState({ endPartBounds: endPartBounds, endAt: endAt });
        if (_this.props.highlightUpdated) _this.props.highlightUpdated(startAt, endAt);
        if (_this.props.onEndMarkChagned) _this.props.onStartMarkChagned(endAt);
        return true;
      },

      // resizing
      resizing: false,
      setResizing: function setResizing(resizeMouseDown) {
        return _this.setState({ resizeMouseDown: resizeMouseDown });
      },
      resizingLeft: false,
      setResizingLeft: function setResizingLeft(resizingLeft) {
        return _this.setState({ resizingLeft: resizingLeft });
      },
      resizingRight: false,
      setResizingRight: function setResizingRight(resizingRight) {
        return _this.setState({ resizingRight: resizingRight });
      }

      // static getDerivedStateFromProps(props, state) {
      //   state.startAt = props.default_start_marker_at
      //   state.endAt = props.default_end_marker_at
      //   return state
      // }

    }, _this.handleMouseEnter = function () {
      // this.setState({ previewShow: true })
    }, _this.handleMouseLeave = function () {
      _this.setState({ previewShow: false, resizingLeft: false, resizingRight: false });
    }, _this.handleMouseUp = function () {
      _this.setState({ resizingLeft: false, resizingRight: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SubclipMarker.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // this.setState({ mounted: true, containerRef: this.el })
    this._handleResize = function () {
      var previewPartBounds = SubclipMarker.refs.previewPart.getBoundingClientRect();
      var containerBounds = SubclipMarker.refs.container.getBoundingClientRect();
      var startPartBounds = SubclipMarker.refs.startPart.getBoundingClientRect();
      var endPartBounds = SubclipMarker.refs.endPart.getBoundingClientRect();

      _this2.setState({
        previewPartBounds: previewPartBounds,
        containerBounds: containerBounds,
        startPartBounds: startPartBounds,
        endPartBounds: endPartBounds
      });
    };
    window.addEventListener("resize", (0, _lodash2.default)(this._handleResize, 50));
  };

  SubclipMarker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.setState({ mounted: false });
    window.removeEventListener("resize", (0, _lodash2.default)(this._handleResize, 500));
  };

  SubclipMarker.prototype.componentDidCatch = function componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  };

  SubclipMarker.prototype.render = function render() {
    var _this3 = this;

    var _state = this.state,
        resizingLeft = _state.resizingLeft,
        resizingRight = _state.resizingRight,
        error = _state.error,
        errorInfo = _state.errorInfo,
        endPartBounds = _state.endPartBounds,
        startPartBounds = _state.startPartBounds;
    var _props = this.props,
        thumbnails = _props.thumbnails,
        ns = _props.numberOfThumbnails;

    var l = Object.keys(thumbnails);

    var numberOfThumbnails = ns || 10;
    numberOfThumbnails = numberOfThumbnails > l ? l : numberOfThumbnails;

    if (error) {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Oh-no! Something went wrong"
        ),
        _react2.default.createElement(
          "p",
          { className: "red" },
          error && error.toString()
        ),
        _react2.default.createElement(
          "div",
          null,
          "Component Stack Error Details: "
        ),
        _react2.default.createElement(
          "p",
          { className: "red" },
          errorInfo.componentStack
        )
      );
    }

    return _react2.default.createElement(
      SubclipContext.Provider,
      { value: this.state },
      _react2.default.createElement(
        "div",
        {
          className: "subclip-container",
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onMouseUp: this.handleMouseUp,
          style: {
            cursor: resizingLeft || resizingRight ? "ew-resize" : "auto",
            opacity: endPartBounds && startPartBounds ? 1 : 0
          },
          ref: function ref(el) {
            return _this3.el = el;
          }
        },
        _react2.default.createElement(_Thumbnails2.default, {
          thumbnails: thumbnails,
          startMarkerAt: this.state.defaultStartAt,
          endMarkerAt: this.state.defaultEndAt,
          numberOfThumbnails: numberOfThumbnails,
          play_position: this.props.play_position
        }),
        _react2.default.createElement(_PlayPositionIndicator2.default, {
          previewPartBounds: this.state.previewPartBounds,
          containerBounds: this.state.containerBounds,
          playPositionIndicatorStyles: this.props.playPositionIndicatorStyles
        }),
        _react2.default.createElement(_Preview2.default, {
          spaceBtwPreviewAndSlider: this.props.spaceBtwPreviewAndSlider || 5,
          img: this.state.previewImg,
          boundTo: this.state.previewThumbBounds,
          show: this.state.previewShow,
          containerBounds: this.state.containerBounds,
          previewPosition: this.props.previewPosition,
          previewStyle: this.props.previewStyle,
          imgPreviewStyle: this.props.imgPreviewStyle
        }),
        _react2.default.createElement(_Preview2.default, {
          spaceBtwPreviewAndSlider: this.props.spaceBtwPreviewAndSlider || 5,
          img: this.state.startPartImg,
          boundTo: this.state.startPartBounds,
          show: !this.state.previewShow,
          containerBounds: this.state.containerBounds,
          previewPosition: this.props.previewPosition,
          previewStyle: this.props.previewStyle,
          imgPreviewStyle: this.props.imgPreviewStyle
        }),
        _react2.default.createElement(_Preview2.default, {
          spaceBtwPreviewAndSlider: this.props.spaceBtwPreviewAndSlider || 5,
          img: this.state.endPartImg,
          boundTo: this.state.endPartBounds,
          show: !this.state.previewShow,
          containerBounds: this.state.containerBounds,
          previewPosition: this.props.previewPosition,
          previewStyle: this.props.previewStyle,
          imgPreviewStyle: this.props.imgPreviewStyle
        }),
        _react2.default.createElement(_Highlight2.default, {
          endPartBounds: this.state.endPartBounds,
          startPartBounds: this.state.startPartBounds,
          containerBounds: this.state.containerBounds,
          setResizingLeft: this.state.setResizingLeft,
          setResizingRight: this.state.setResizingRight,
          highlightStyles: this.props.highlightStyles,
          resizeIndicatorsStyle: this.props.resizeIndicatorsStyle,
          resizeLeftIndicatorStyle: this.props.resizeLeftIndicatorStyle,
          resizeRightIndicatorStyle: this.props.resizeRightIndicatorStyle,
          resizeIndicatorCirclesStyle: this.props.resizeIndicatorCirclesStyle,
          resizeIndicatorCirclesCount: this.props.resizeIndicatorCirclesCount || 5
        })
      )
    );
  };

  return SubclipMarker;
}(_react2.default.Component), _class.refs = {}, _temp2);
exports.default = SubclipMarker;