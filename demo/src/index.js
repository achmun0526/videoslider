import React, { Component } from "react"
import { render } from "react-dom"
import thumbnails from "./moments.json"
import VideoSlider from "../../src"

import "../../src/styles.css"

class Demo extends Component {
  state = {
    play_position: 13,
    numberOfThumbnails: 10,
    endAt: 10.0,
    startAt: 3.0,
    minimum_marked_length: 3,
  }

  renderInfo() {
    return (
      <div style={{ marginBottom: "200px", marginLeft: "20px" }}>
        <style>
          {`body {
            margin: 0;
            margin-top: 20px;
            background-color: #333;
            color: #bbb;
          }`}
        </style>
        <input
          type="range"
          min={0}
          max={19.5}
          step={0.5}
          value={this.state.play_position}
          onChange={this.handlePlayPositionChange}
        />
        play position: &nbsp; {this.state.play_position}
        <br />
        startAt: &nbsp; {this.state.startAt}
        <br />
        endAt: &nbsp; {this.state.endAt}
        <br />
        minimum marked length: &nbsp; {this.state.minimum_marked_length}
      </div>
    )
  }

  highlightUpdated = (startAt, endAt) => {
    this.setState({ startAt, endAt })
  }

  handlePlayPositionChange = e => {
    this.setState({
      play_position: e.target.value,
    })
  }

  render() {
    return (
      <div>
        {this.renderInfo()}
        <VideoSlider
          thumbnails={thumbnails}
          startAt={this.state.startAt}
          endAt={this.state.endAt}
          // minimum_marked_length={this.state.minimum_marked_length}
          previewPosition={"bottom"} // omit if you want the preview on top.
          // numberOfThumbnails={this.state.numberOfThumbnails}
          // highlightUpdated={this.highlightUpdated}
          // onStartMarkChagned={this.startMarkerChange}
          // onEndMarkChagned={this.startMarkerChange}

          play_position={this.state.play_position}
          // playPositionIndicatorStyles={{background: "green"}}

          // top and bottom are the space between the highlight border and the slider.
          // you can also add borders and such, keep in mind that you always need top/bottom
          // if you wanna see a border.
          highlightStyles={{ top: "-7px", bottom: "-7px" }}
          // resize indicators styles ( shared )
          // resizeIndicatorsStyle={{background: "green"}}
          // resize indicator left styles
          // resizeLeftIndicatorStyle={{ background: "red",paddingTop: "10px", paddingBottom: "10px" }}
          // resize indicator right styles
          // resizeRightIndicatorStyle={{ background: "red",paddingTop: "10px", paddingBottom: "10px" }}

          // circles inside the resizer, count and styles
          // resizeIndicatorCirclesCount={4}
          // resizeIndicatorCirclesStyle={{ background: "green" }}

          // preview is the popup the displays on top|bottom.
          // to override preview container styles.
          // previewStyle={{ border: `1px solid red` }}
          // to override img preview styles
          // imgPreviewStyle={{ width: `100px` }}

          // to increase or reduce space between preview and slider. ( in px. )
          spaceBtwPreviewAndSlider={10}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
