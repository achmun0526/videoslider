import React from "react"

class Preview extends React.PureComponent {
  state = {
    el: null,
  }

  handleLoad = () => {
    requestAnimationFrame(() => {
      this.forceUpdate()
    })
  }

  render() {
    const { img, boundTo, show, containerBounds, previewPosition } = this.props
    if (!img || !boundTo || !containerBounds) return null

    const left = boundTo.left - containerBounds.left

    const { max, min } = Math
    let diff = 0
    if (this.state.el) {
      const els = [this.state.el.getBoundingClientRect().width, boundTo.width]
      diff = (max(...els) - min(...els)) / 2
      if (els[0] < els[1]) diff = -diff
    }

    let space = this.props.spaceBtwPreviewAndSlider

    const style = {
      [previewPosition == "bottom" ? "top" : "bottom"]: containerBounds.height + space,
      left: `${left - diff}px`,
      display: this.state.el ? "block" : "none",
      ...this.props.previewStyle,
    }

    const cn = show ? "subclip-preview--in" : "subclip-preview--out"

    return (
      <div
        ref={el => this.setState({ el })}
        className={`subclip-preview ${cn}`}
        style={style}
      >
        <img
          src={img}
          alt="preview"
          onLoad={this.handleLoad}
          style={this.props.imgPreviewStyle}
        />
      </div>
    )
  }
}

export default Preview
