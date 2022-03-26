import { useCallback } from "react"

export const useUnitySendMessage = (unityContext) => {

  const uploadArt = useCallback((size, frame, position, url) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [size, frame, position, url].join(",");

    console.log("uploadArt", outputString);
    unityContext.send("GameController", "ArtJson", outputString)
  }, [unityContext])

  const deleteArtAtPosition = useCallback((position) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [position].join(",")

    console.log("deleteArtAtPosition", outputString);
    unityContext.send("GameController", "ArtDeleteJson", outputString)
  }, [unityContext])

  const loadLargeObject = useCallback((position, texture, url) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [position, texture, url].join(",");

    console.log("loadLargeObject", outputString);
    unityContext.send("GameController", "ObjJson", outputString)
  }, [unityContext])

  const deleteLargeObjectAtPosition = useCallback((position) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [position].join(",");

    console.log("loadLargeObject", outputString);
    unityContext.send("GameController", "ObjDeleteJson", outputString)
  }, [unityContext])

  const loadSmallObject = useCallback((position, texture, url) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [position, texture, url].join(",");

    console.log("loadSmallObject", outputString);
    unityContext.send("GameController", "ObjSJson", outputString)
  }, [unityContext])

  const deleteSmallObjectAtPosition = useCallback((position) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [position].join(",");

    console.log("deleteSmallObjectAtPosition", outputString);
    unityContext.send("GameController", "ObjSDeleteJson", outputString)
  }, [unityContext])

  const loadMusic = useCallback((url) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [url].join(",");

    console.log("loadMusic", outputString);
    unityContext.send("GameController", "LoadSong", outputString)
  }, [unityContext])

  const deleteMusic = useCallback(() => {
    if (!unityContext) console.error("unityContext not found")

    console.log("deleteMusic", "[no output string]");
    unityContext.send("GameController", "DeleteSong")
  }, [unityContext])

  const loadSettings = useCallback((music, sFX, xSlider, ySlider, dd) => {
    if (!unityContext) console.error("unityContext not found")
    const outputString = [music, sFX, xSlider, ySlider, dd].join(",");

    console.log("loadSettings", outputString);
    unityContext.send("Canvas", "LoadSettings", outputString)
  }, [unityContext])

  return { 
    uploadArt,
    deleteArtAtPosition,
    loadLargeObject,
    deleteLargeObjectAtPosition,
    loadSmallObject,
    deleteSmallObjectAtPosition,
    loadMusic,
    deleteMusic,
    loadSettings
  }

}