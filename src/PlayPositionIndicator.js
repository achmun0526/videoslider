import React from "react"

class PlayPositionIndicator extends React.PureComponent {
  render() {
    const {
      previewPartBounds,
      playPositionIndicatorStyles: style = {},
      containerBounds,
    } = this.props
    if (!previewPartBounds || !containerBounds) return null
    let left = previewPartBounds.left - containerBounds.left
    return (
      <div style={{ ...style, left: `${left}px` }} className="subclip-marker">
        <div />
      </div>
    )
  }
}

export default PlayPositionIndicator
