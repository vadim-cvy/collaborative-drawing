export default class MouseRelPosition
{
  public constructor(
    protected readonly originalX: number,
    protected readonly originalY: number,
    protected canvasElement: HTMLCanvasElement
  ) {}

  public get x()
  {
    // todo: calculate
    return 0
  }

  public get y()
  {
    // todo: calculate
    return 0
  }
}