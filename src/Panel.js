import React, {Component} from 'react'
import ArduinoCode from './ArduinoCode'

export default class extends Component {

  constructor() {
    super()
    this.state={
      duino:true
    }
  }

  render() {
    const {duino} = this.state
    return <div className="panel">
      <div className="panel-tabs">
        <div className="panel-tab" onClick={()=>this.setState({duino:true})}
          style={{fontWeight:duino?'bold':'normal'}} >
          Arduino setup
        </div>
        <div className="panel-tab" onClick={()=>this.setState({duino:false})}
          style={{fontWeight:!duino?'bold':'normal'}} >
          Server setup
        </div>
        <div className="panel-bar" style={{left:duino?0:225}} />
      </div>

      {duino && <ArduinoCode />}
      {!duino && <ServerSetup />}
      
    
    </div>
  }

}

const ServerSetup = (props) => {
  return <div className="server-setup">

    <div className="dl-server">
      <div>Download the Websocket Server:</div>
      <a style={{textDecoration:'none',fontWeight:'bold',color:'#02066a'}} 
        href="https://github.com/Evanfeenstra/websockettoserial/raw/master/websockettoserial">
        <svg height="24" viewBox="0 0 24 24" width="24" class="dl-icon">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </a>
      <Github />
    </div>

    <br />
    <div>Run the Websocket Server:</div>
    <ul>
      <li>Open the Terminal program and type</li>
      <li><span className="bash">cd&nbsp;&nbsp;Downloads</span></li>
      <li><span className="bash">sudo&nbsp;&nbsp;chmod&nbsp;&nbsp;770&nbsp;&nbsp;websockettoserial</span></li>
      <li><span className="bash">./websockettoserial</span></li>
    </ul>

    <br />
    <div>If your Arduino is up and running, you will see the Websocket Server start up:</div>
    <ul>
      <li><span className="bash">Running HTTP :8000</span></li>
    </ul>

    <br />
    <div>Click the Connect button in the upper right!</div>

  </div>
}

const Github = () => {
  return <a href="https://github.com/Evanfeenstra/websockettoserial" target="_blank"><svg height="19" viewBox="0 0 24 24" className="dl-icon"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
}

