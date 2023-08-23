export function pick(key: string, obj: Record<string, string>) {
  if (obj.hasOwnProperty(key)) {
    const pickedObject = { [key]: obj[key] };
    return pickedObject;
  } else {
    return {};
  }
}
