import tSettingCommandGetter from "./tSettingCommandGetter"

export default abstract class Setting<T extends string | number | boolean>
{
  public constructor(
    public readonly label: string,
    protected readonly commandGetter: tSettingCommandGetter<T>
  )
  {
    this.selectedOptionIndex = 0
  }

  public abstract readonly options: {
    label: string,
    value: T
  }[]

  public selectedOptionIndex: number

  public get selectedOption()
  {
    return this.options[ this.selectedOptionIndex ]
  }

  public get command()
  {
    return this.commandGetter( this.selectedOption.value )
  }
}