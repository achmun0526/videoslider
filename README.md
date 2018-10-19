# Quick documentation on how to use the component

Edit:

the simplest way to use the component would be as follows.

```js
import SubclipMarker from "vid-slider"
import "./node_modules/vid-slider/lib/styles.css"

<SubclipMarker
  // thumbnails with all the photos
  thumbnails={{
    "0.0": "url",
    "0.5": "url",
    ...
  }}

  // where the marker starts.
 startAt="1.0"
  // where the marker ends.
  endAt="13.0"
/>
```

`numberOfThumbnails` is the number of phontos that would display on the slider defaults to `10` if none was provided.

keep in mind that if you provide less entries in the objects the `numberOfThumbnails` that would be used instead of the `numberOfThumbnails`.

`onStartMarkChagned` fn: will be called when the start value of the marker change

`onEndMarkChagned` fn: will be called when the end value of the marker change

`highlightUpdated` fn: will be called when either start/end values are changed

`minimum_marked_length` minimum length is sec that the marker can't be below.

`play_position` where to render the play position indicator `startAt` when to start marker at. `endAt` when to end marker at.

keep in mind that `play_position`, `startAt` and `endAt` all have to match keys in the `thumbnails` object provided.

`play_position` is optional.

`startAt` and `endAt` are mandatory without them the component be diplayed.

`previewPosition` prop specify where the preview should render, it accepts "top" or "bottom" values it defaults to "top"

you can pretty much overriding any components style with

`highlightStyles`, `resizeIndicatorsStyle`, `resizeLeftIndicatorStyle`, `resizeRightIndicatorStyle`,`resizeIndicatorCirclesStyle`, `previewStyle`, `imgPreviewStyle`.

names are indicative of what they override.

to override the numver of circles in the resize indicator use prop `resizeIndicatorCirclesCount`
