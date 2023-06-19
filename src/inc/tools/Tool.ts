import Setting from "./settings/Setting"

export default class Tool
{
  public constructor(
    public readonly label: string,
    public readonly settings: Setting[]
  ) {}
}