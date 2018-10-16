import React from "react"
import { SubclipContext } from "./SubclipMarker"

import Thumbnail from "./Thumbnail"

class Thumbnails extends React.Component {
  render() {
    const { thumbnails, numberOfThumbnails } = this.props
    // ...
    const thumbnailsArray = Object.keys(thumbnails).map(key => {
      return {
        key,
        url: thumbnails[key],
      }
    })

    const length = thumbnailsArray.length
    const ratio = length / numberOfThumbnails

    return (
      <SubclipContext.Consumer>
        {cProps => (
          <div className="subclip-thmbnails">
            {Array(this.props.numberOfThumbnails)
              .fill()
              .map((_, i) => (
                <Thumbnail
                  key={thumbnailsArray[i].key}
                  imgs={thumbnailsArray.slice(i * ratio, i * ratio + ratio)}
                  {...cProps}
                  {...this.props}
                />
              ))}
          </div>
        )}
      </SubclipContext.Consumer>
    )
  }
}

export default Thumbnails
