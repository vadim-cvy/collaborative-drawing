import Color from "./settings/Color";
import Size from "./settings/Size";
import Tool from "./Tool";

export default class Line extends Tool
{
  public constructor()
  {
    super( 'Line', [
      new Color(),
      new Size(),
    ])
  }
}