import React from "react"
import SubclipMarker from "./SubclipMarker"

class ThumbnailPart extends React.Component {
  handlePartMouseEnter = e => {
    const {
      setStartPartBounds,
      setEndPartBounds,
      resizingLeft,
      resizingRight,
      setPreviewThumbBounds,
      setPreviewShow,
      setPreviewImg,
      parent,
      parentBounds,
      img,
    } = this.props

    SubclipMarker.refs.previewThumbBounds = parent

    // handle preview img
    setPreviewThumbBounds(parentBounds)
    setPreviewShow(true)
    setPreviewImg(img.url)

    if (resizingLeft) {
      if (setStartPartBounds(this.el.getBoundingClientRect(), Number(img.key)))
        SubclipMarker.refs.startPart = this.el
    }

    if (resizingRight) {
      if (setEndPartBounds(this.el.getBoundingClientRect(), Number(img.key)))
        SubclipMarker.refs.endPart = this.el
    }
  }

  componentDidMount = () => {
    const {
      play_position,
      img,
      startMarkerAt,
      endMarkerAt,
      setStartPartBounds,
      setEndPartBounds,
      setStartPartImg,
      setEndPartImg,
    } = this.props

    if (img.key == play_position) {
      SubclipMarker.refs.previewPart = this.el
      this.props.setPreviewPartBounds(this.el.getBoundingClientRect())
    }

    if (img.key == startMarkerAt) {
      SubclipMarker.refs.startPart = this.el
      if (setStartPartBounds(this.el.getBoundingClientRect(), Number(img.key)))
        setStartPartImg(img.url)
    }

    if (img.key == endMarkerAt) {
      SubclipMarker.refs.endPart = this.el
      if (setEndPartBounds(this.el.getBoundingClientRect(), Number(img.key))) setEndPartImg(img.url)
    }
  }

  shouldComponentUpdate({ img: nImg, play_position: pp }) {
    const { img, play_position } = this.props
    return nImg.url !== img.url || Number(play_position) !== Number(pp)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { play_position, img } = this.props
    if (Number(img.key) === Number(play_position)) {
      SubclipMarker.refs.previewPart = this.el
      this.props.setPreviewPartBounds(this.el.getBoundingClientRect())
    }
  }

  render() {
    const { img } = this.props
    return (
      <div
        data-url={img.url}
        data-time={img.key}
        ref={el => {
          this.el = el
        }}
        className="subclip__thumbnail__part"
        onMouseEnter={this.handlePartMouseEnter}
        onMouseLeave={this.handlePartMouseLeave}
      />
    )
  }
}
export default ThumbnailPart
