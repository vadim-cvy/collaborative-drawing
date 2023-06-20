import tMouseEventType from "../drawing/mouse/tMouseEventType";

type tUpdateToolCommandMouseEventType = Exclude<tMouseEventType, 'down'>

export default tUpdateToolCommandMouseEventType