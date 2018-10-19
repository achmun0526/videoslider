import React from "react"
import debounce from "lodash.debounce"
import Thumbnails from "./Thumbnails"

import Highlight from "./Highlight"
import PlayPositionIndicator from "./PlayPositionIndicator"
import Preview from "./Preview"

export const SubclipContext = React.createContext()

class SubclipMarker extends React.Component {
  static refs = {}

  state = {
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

    defaultStartAt: this.props.startAt,
    defaultEndAt: this.props.endAt,

    startAt: this.props.startAt,
    endAt: this.props.endAt,

    // mutators.
    setContainerBounds: containerBounds => this.setState({ containerBounds }),
    setPreviewThumbBounds: previewThumbBounds => this.setState({ previewThumbBounds }),
    setPreviewPartBounds: previewPartBounds => this.setState({ previewPartBounds }),

    setPreviewShow: previewShow => this.setState({ previewShow }),
    setPreviewImg: previewImg => this.setState({ previewImg }),
    setStartPartImg: startPartImg => this.setState({ startPartImg }),
    setEndPartImg: endPartImg => this.setState({ endPartImg }),

    setStartPartBounds: (startPartBounds, startAt) => {
      const { endAt } = this.state

      if (endAt - startAt < this.props.minimum_marked_length) {
        return false
      }
      this.setState({ startPartBounds, startAt })
      if (this.props.highlightUpdated) this.props.highlightUpdated(startAt, endAt)
      if (this.props.onStartMarkChagned) this.props.onStartMarkChagned(startAt)
      return true
    },

    setEndPartBounds: (endPartBounds, endAt) => {
      const { startAt } = this.state
      if (endAt - startAt < this.props.minimum_marked_length) {
        return false
      }

      this.setState({ endPartBounds, endAt })
      if (this.props.highlightUpdated) this.props.highlightUpdated(startAt, endAt)
      if (this.props.onEndMarkChagned) this.props.onStartMarkChagned(endAt)
      return true
    },

    // resizing
    resizing: false,
    setResizing: resizeMouseDown => this.setState({ resizeMouseDown }),
    resizingLeft: false,
    setResizingLeft: resizingLeft => this.setState({ resizingLeft }),
    resizingRight: false,
    setResizingRight: resizingRight => this.setState({ resizingRight }),
  }

  // static getDerivedStateFromProps(props, state) {
  //   state.startAt = props.default_start_marker_at
  //   state.endAt = props.default_end_marker_at
  //   return state
  // }

  componentDidMount() {
    // this.setState({ mounted: true, containerRef: this.el })
    this._handleResize = () => {
      const previewPartBounds = SubclipMarker.refs.previewPart.getBoundingClientRect()
      const containerBounds = SubclipMarker.refs.container.getBoundingClientRect()
      const startPartBounds = SubclipMarker.refs.startPart.getBoundingClientRect()
      const endPartBounds = SubclipMarker.refs.endPart.getBoundingClientRect()

      this.setState({
        previewPartBounds,
        containerBounds,
        startPartBounds,
        endPartBounds,
      })
    }
    window.addEventListener("resize", debounce(this._handleResize, 50))
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
    window.removeEventListener("resize", debounce(this._handleResize, 500))
  }

  handleMouseEnter = () => {
    // this.setState({ previewShow: true })
  }

  handleMouseLeave = () => {
    this.setState({ previewShow: false, resizingLeft: false, resizingRight: false })
  }

  handleMouseUp = () => {
    this.setState({ resizingLeft: false, resizingRight: false })
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    const {
      resizingLeft,
      resizingRight,
      error,
      errorInfo,
      endPartBounds,
      startPartBounds,
    } = this.state
    const { thumbnails, numberOfThumbnails: ns } = this.props
    const l = Object.keys(thumbnails)

    let numberOfThumbnails = ns || 10
    numberOfThumbnails = numberOfThumbnails > l ? l : numberOfThumbnails

    if (error) {
      return (
        <div>
          <h2>{"Oh-no! Something went wrong"}</h2>
          <p className="red">{error && error.toString()}</p>
          <div>{"Component Stack Error Details: "}</div>
          <p className="red">{errorInfo.componentStack}</p>
        </div>
      )
    }

    return (
      <SubclipContext.Provider value={this.state}>
        <div
          className="subclip-container"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          style={{
            cursor: resizingLeft || resizingRight ? "ew-resize" : "auto",
            opacity: endPartBounds && startPartBounds ? 1 : 0,
          }}
          ref={el => (this.el = el)}
        >
          <Thumbnails
            thumbnails={thumbnails}
            startMarkerAt={this.state.defaultStartAt}
            endMarkerAt={this.state.defaultEndAt}
            numberOfThumbnails={numberOfThumbnails}
            play_position={this.props.play_position}
          />

          <PlayPositionIndicator
            previewPartBounds={this.state.previewPartBounds}
            containerBounds={this.state.containerBounds}
            playPositionIndicatorStyles={this.props.playPositionIndicatorStyles}
          />

          <Preview
            spaceBtwPreviewAndSlider={this.props.spaceBtwPreviewAndSlider || 5}
            img={this.state.previewImg}
            boundTo={this.state.previewThumbBounds}
            show={this.state.previewShow}
            containerBounds={this.state.containerBounds}
            previewPosition={this.props.previewPosition}
            previewStyle={this.props.previewStyle}
            imgPreviewStyle={this.props.imgPreviewStyle}
          />

          <Preview
            spaceBtwPreviewAndSlider={this.props.spaceBtwPreviewAndSlider || 5}
            img={this.state.startPartImg}
            boundTo={this.state.startPartBounds}
            show={!this.state.previewShow}
            containerBounds={this.state.containerBounds}
            previewPosition={this.props.previewPosition}
            previewStyle={this.props.previewStyle}
            imgPreviewStyle={this.props.imgPreviewStyle}
          />

          <Preview
            spaceBtwPreviewAndSlider={this.props.spaceBtwPreviewAndSlider || 5}
            img={this.state.endPartImg}
            boundTo={this.state.endPartBounds}
            show={!this.state.previewShow}
            containerBounds={this.state.containerBounds}
            previewPosition={this.props.previewPosition}
            previewStyle={this.props.previewStyle}
            imgPreviewStyle={this.props.imgPreviewStyle}
          />

          <Highlight
            endPartBounds={this.state.endPartBounds}
            startPartBounds={this.state.startPartBounds}
            containerBounds={this.state.containerBounds}
            setResizingLeft={this.state.setResizingLeft}
            setResizingRight={this.state.setResizingRight}
            highlightStyles={this.props.highlightStyles}
            resizeIndicatorsStyle={this.props.resizeIndicatorsStyle}
            resizeLeftIndicatorStyle={this.props.resizeLeftIndicatorStyle}
            resizeRightIndicatorStyle={this.props.resizeRightIndicatorStyle}
            resizeIndicatorCirclesStyle={this.props.resizeIndicatorCirclesStyle}
            resizeIndicatorCirclesCount={this.props.resizeIndicatorCirclesCount || 5}
          />
        </div>
      </SubclipContext.Provider>
    )
  }
}

export default SubclipMarker
