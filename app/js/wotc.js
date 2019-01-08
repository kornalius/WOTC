let electron = require('electron')
let remote = electron.remote
let app = remote.app
let shell = electron.shell
let fs = remote.require('fs-plus')

import ReactDOM from 'react-dom'
import React from 'react'
import Radium, { Style, StyleRoot } from 'radium'
import path from 'path'

let userPath = path.join(path.dirname(module.filename), '../user')
if (!fs.existsSync(userPath)) {
  fs.mkdirSync(userPath)
}

let _ = require('underscore-plus')
_.extend(_, require('lodash'))

let IS_WIN = /^win/.test(process.platform)
let IS_OSX = process.platform === 'darwin'
let IS_LINUX = process.platform === 'linux'
let dirs = {
  home: app.getPath('home'),
  app: app.getPath('appData'),
  user: userPath,
  tmp: app.getPath('temp'),
  root: app.getPath('exe'),
  module: path.dirname(module.filename),
  node_modules: path.join(userPath, 'node_modules'),
  user_pkg: path.join(userPath, 'package.json'),
}

export {
  _,
  electron,
  remote,
  app,
  shell,
  fs,
  ReactDOM,
  React,
  Radium,
  Style,
  StyleRoot,
  path,
  userPath,
  IS_WIN,
  IS_OSX,
  IS_LINUX,
  dirs,
}
