export const resetPathDistance  = () => {
  $("#path").text("0")
}

export const incrementPathDistance = () => {
  let currentDistance = parseInt($("#path").text())
  currentDistance++
  $("#path").text(currentDistance)
}
