export default function pick(
  key: string,
  obj: Record<string, string> | undefined
) {
  if (obj)
    if (obj.hasOwnProperty(key)) {
      const pickedObject = { [key]: obj[key] };
      return pickedObject;
    } else {
      return {};
    }
}
