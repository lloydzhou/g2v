// @ts-nocheck
import { ChartEvent } from '@antv/g2';

const eventNames = new Set(Object.keys(ChartEvent))
const toLine = (name: string) => name.replace(/([A-Z])/g,"_$1").toUpperCase()

export const processProps = (props) => {
  return Object.entries(props).reduce((res, [name, value]) => {
    if (name.startsWith('on')) {
      const t = toLine(name).split('_').slice(1)
      let i = 0, event = ''
      /**
       * onBeforeRender --> beforerender
       * onElementClick --> element:click
       * onAfterChangeData --> afterchangedata
       */
      while(i >= -3) {
        if (eventNames.has(event = t.slice(--i).join('_'))) {
          const eventName = ChartEvent[event].toLowerCase()
          res.events[t.length == -i ? eventName : t.slice(i-1, i).pop().toLowerCase() + ':' + eventName] = value
          break
        }
      }
    } else {
      res.options[name] = value
    }
    return res
  }, {options:{}, events: {}})
}

