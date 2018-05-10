import { Application } from 'stimulus'

function registerApplication(id, controllerClass) {
  fixture.load('index.html')
  this._stimulusApp = Application.start()
  this._stimulusApp.register(id, controllerClass)
  this.controller = this._stimulusApp.controllers[0]
}

function findTabByName(name) {
  return fixture.el.firstChild.querySelector(`[data-target$=${name}]`)
}

export { registerApplication, findTabByName }
