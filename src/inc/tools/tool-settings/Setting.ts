export default class Setting
{
  public selectedOption: number

  public constructor(
    public readonly label: string,
    public readonly options: {
      label: string,
      value: string | number
    }[]
  )
  {
    this.selectedOption = 0
  }
}