import MouseRelPosition from "../drawing/canvas/mouse/MouseRelPosition";
import tMouseEventType from "../drawing/canvas/mouse/tMouseEventType";
import Layer from "../drawing/Layer";
import Setting from "./settings/Setting"

export default class Tool
{
  public constructor(
    public readonly label: string,
    public readonly settings: Setting[]
  ) {}

  public maybeUpdateLayerOnMouseEvent( e: tMouseEventType, cursor: MouseRelPosition, layer: Layer )
  {
    // todo: maybe add new action or update prev actions and their props
  }
}