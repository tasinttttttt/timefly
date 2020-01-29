const FlyView = (id) => {
  let container = null
  let isInit = false

  const init = () => {
    if (!isInit) {
      container = document.getElementById(id)
      if (!container.length) {
        console.log("FlyView : container not found");
      }
      isInit = true;
    }
  }

  const move = (position) => {
    container.style.transform = 'translate(' + position.x + 'px, ' + position.y + 'px)'
  }

  const getHtml = () => {
    return '<div id="' + id + '" class="fly"></div>'
  }

  return {
    init,
    move,
    getHtml
  }
}

export default FlyView