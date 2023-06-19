import Tool from "../tools/Tool";
import MouseRelPosition from "./canvas/mouse/MouseRelPosition";
import tMouseEventType from "./canvas/mouse/tMouseEventType";

export default class Layer
{
  public onMouseEvent( e: tMouseEventType, cursor: MouseRelPosition, tool: Tool )
  {
    // todo: maybe add new action or update prev actions and their props
  }

  public render( ctx: CanvasRenderingContext2D )
  {
    // todo: implement
  }
}