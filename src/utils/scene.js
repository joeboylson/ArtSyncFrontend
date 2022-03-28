import { last, startCase } from "lodash"

export const scenePathToHumanReadable = (path) => {

  console.log({path})

  const name =  last(path.split("\\"))
  return startCase(name);
}