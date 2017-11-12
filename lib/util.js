export const resetPathDistance  = () => {
  $("#path").text("0")
}

export const incrementPathDistance = () => {
  let currentDistance = parseInt($("#path").text())
  currentDistance++
  $("#path").text(currentDistance)
}

export const colorPath = cell => {
  if (!cell) {
    return
  }
  setTimeout( () => {
    cell.path = true;
    cell.draw()
    colorPath(cell.parent)
    incrementPathDistance();
  }, 2)
}

// Source: femto113 via github
// https://gist.github.com/femto113/1784503
export const transpose = (a) => a[0].map((_, c) => a.map(r => r[c]));
