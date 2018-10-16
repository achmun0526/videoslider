import React from "react"
import range from "lodash.range"

class Highlight extends React.PureComponent {
  componentDidMount = () => {}

  handleLeftMouseDown = () => {
    const { setResizingLeft } = this.props
    setResizingLeft(true)
  }

  handleRightMouseDown = () => {
    const { setResizingRight } = this.props
    setResizingRight(true)
  }

  renderCircles = () => {
    const { resizeIndicatorCirclesCount, resizeIndicatorCirclesStyle: style } = this.props
    return (
      <React.Fragment>
        {range(resizeIndicatorCirclesCount).map((k, i) => (
          <span className="subclip__highlight--point" style={style} key={i} />
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { endPartBounds, startPartBounds, containerBounds } = this.props
    if (!startPartBounds || !endPartBounds || !containerBounds) return null

    const right =
      containerBounds.width - endPartBounds.left + containerBounds.left - endPartBounds.width

    const style = {
      top: `${containerBounds.top}px`,
      bottom: `${containerBounds.bottom}px`,
      left: `${startPartBounds.left - containerBounds.left}px`,
      right: `${right}px`,
      ...this.props.highlightStyles,
    }

    const leftWidth = `${startPartBounds.left - containerBounds.left}px`
    const rightWidth = right

    return (
      <div className="subclip__highlight--outer">
        {/* left */}
        <div className="subclip__highlight--out" style={{ left: 0, width: leftWidth }} />

        <div className="subclip__highlight" style={style}>
          <div onMouseDown={this.handleLeftMouseDown} className="subclip__highlight--left">
            <div
              className="subclip__highlight__resize--inner"
              style={{
                ...this.props.resizeIndicatorsStyle,
                ...this.props.resizeLeftIndicatorStyle,
              }}
            >
              {this.renderCircles()}
            </div>
          </div>
          <div onMouseDown={this.handleRightMouseDown} className="subclip__highlight--right">
            <div
              className="subclip__highlight__resize--inner"
              style={{
                ...this.props.resizeIndicatorsStyle,
                ...this.props.resizeRightIndicatorStyle,
              }}
            >
              {this.renderCircles()}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="subclip__highlight--out" style={{ right: 0, width: rightWidth }} />
      </div>
    )
  }
}

export default Highlight
