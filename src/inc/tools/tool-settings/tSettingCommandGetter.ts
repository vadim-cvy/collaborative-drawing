import iCommand from "@/inc/board/commands/iCommand";

type tSettingCommandGetter<T> = ( selectedOptionValue: T ) => iCommand

export default tSettingCommandGetter