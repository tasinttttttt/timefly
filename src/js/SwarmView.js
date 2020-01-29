const SwarmView = (params) => {
  const id = params.id ? params.id : 'swarm-view'
  const size = params.size ? params.size : 300
  let container = null
  let isInit = false

  const init = (flies) => {
    if (!isInit) {
      let fliesHtml = ""

      console.dir(flies)
      for (let i = 0; i < flies.length; i++) {
        let fly = flies[i];
        fliesHtml += fly.view.getHtml.call(fly.view);
      }
      container = document.createElement('div')
      container.id = id
      container.style.width = size + 'px'
      container.style.height = size + 'px'
      container.innerHTML = fliesHtml
      document.body.appendChild(container)
      isInit = true
    }
  }
  return {
    init
  }
};

export default SwarmView
