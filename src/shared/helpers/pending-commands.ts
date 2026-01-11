const pendingCommands = new Map<
    string,
    { resolve: Function; reject: Function; timeout: NodeJS.Timeout }
>();

export default pendingCommands;