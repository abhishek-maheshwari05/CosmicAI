let counter = 0;
export const createId = () => `local-${Date.now().toString(36)}-${(counter++).toString(36)}`;
