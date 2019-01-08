import { React, Style } from '../../wotc'

export default React.createClass({

  getInitialState () {
    return { }
  },

  render () {
    return (
      <div className='index'>

        <Style scopeSelector='.index' rules={{
          color: 'white',
        }} />

        <h2>When Our Time Comes</h2>

        <pre>
          <div>{'We are using node ' + process.versions.node}</div>
          <div>{'Chromium ' + process.versions.chrome}</div>
          <div>{'and Electron ' + process.versions.electron}</div>
        </pre>
      </div>
    )
  }
})
