import Color from "./settings/Color";
import Size from "./settings/Size";
import Tool from "./Tool";

export default class Pencil extends Tool
{
  public constructor()
  {
    super( 'Pencil', [
      new Color(),
      new Size(),
    ])
  }
}