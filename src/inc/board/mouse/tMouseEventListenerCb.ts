import tCoord from "../tCoord";
import tMouseEventType from "./tMouseEventType";

type tMouseEventListenerCb = ( eventType: tMouseEventType, cursorPosition: tCoord ) => void

export default tMouseEventListenerCb