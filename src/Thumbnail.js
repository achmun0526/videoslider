import React from "react"
import ThumbnailPart from "./ThumbnailPart"
import SubclipMarker from "./SubclipMarker"

class Thumbnail extends React.PureComponent {
  state = {
    mounted: false,
  }

  handleImageLoad = () => {
    const { setContainerBounds } = this.props
    requestAnimationFrame(() => {
      SubclipMarker.refs.container =
        SubclipMarker.refs.container || document.querySelector(".subclip-container")
      setContainerBounds(SubclipMarker.refs.container.getBoundingClientRect())
      this.setState({
        mounted: true,
      })
    })
  }

  render() {
    const { imgs } = this.props

    return (
      <div className="subclip-thmbnail" ref={el => (this.el = el)}>
        <img
          src={imgs[0].url}
          alt={""}
          draggable={false}
          onLoad={this.handleImageLoad}
        />
        <div className="subclip-thmbnail--inner">
          {this.state.mounted &&
            imgs.map(img => (
              <ThumbnailPart
                {...this.props}
                img={img}
                key={`${img.url}//${img.key}`}
                parent={this.el}
                parentBounds={this.el.getBoundingClientRect()}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default Thumbnail
