import Tool from "../../tools/Tool";
import tMouseEventType from "../canvas/mouse/tMouseEventType";
import tCoord from "../tCoord";
import Command from "./commands/Command";

/**
 * todo: get rid of layers.
 * - keep commands in the tool
 * - execute commands on the top layer via board.drawTmp( commands )
 * - on isSelected set to false
 *    - move commands to bottom layer via board.drawPersistant( commands )
 *    - reset commands in the tool
 *
 * Board should trigger mouse events for selected tool only
 * */
export default class Layer
{
  protected subLayers: {
    tool: Tool,
    commands: Command[],
  }[] = []

  public onMouseEvent( e: tMouseEventType, coord: tCoord, tool: Tool )
  {
    if ( ! this.subLayers.length || this.subLayers[ this.subLayers.length - 1 ].tool !== tool )
    {
      this.subLayers.push({
        tool,
        commands: [],
      })
    }

    tool.maybeUpdateCommandsOnMouseEvent( e, coord, this.subLayers[ this.subLayers.length - 1 ].commands )
  }

  public render( ctx: CanvasRenderingContext2D )
  {
    this.subLayers.forEach( subLayer => subLayer.commands.forEach(
      command => command.do( ctx )
    ))
  }
}