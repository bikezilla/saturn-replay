# Saturn Replay

A tiny tool to replay race results on Saturn time keeping system

## How to

1. Edit config in source with event id, start time and duration
2. Run `node saturn-replay.js` to grab screenshots
3. Run `ffmpeg -r 3 -pattern_type glob -i "images/*.jpg" out.mp` to stitch a video
