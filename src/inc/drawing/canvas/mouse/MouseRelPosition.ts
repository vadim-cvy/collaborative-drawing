export default class MouseRelPosition
{
  public constructor(
    protected readonly originalX: number,
    protected readonly originalY: number,
    protected readonly canvasOffsetLeft: number,
    protected readonly canvasOffsetTop: number,
    protected readonly scale: number,
  ) {}

  public get x()
  {
    return ( this.originalX - this.canvasOffsetLeft ) * this.scale
  }

  public get y()
  {
    return ( this.originalY - this.canvasOffsetTop ) * this.scale
  }
}