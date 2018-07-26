import React, { Component } from 'react';
import Bluetooth from './bluetooth'
import Gooey from './gooey'
import mqtt from 'mqtt'
import { disableBodyScroll } from 'body-scroll-lock';

//import Panel from './Panel'

const MQTT_SERVER = 'wss://mqtt.flespi.io:443'
const MQTT_USERNAME = 'hloO5Mk5OAXgEDmTz8BWgKmRrVXwhfympL0klaf0z041tgKRcaBiKLYZwJmDNIN2'

class App extends Component {

	constructor(){
		super()
		this.state={
			char: null,
			toggle:false,
			connected:false
		}
		this.finding = false
		this.toggleCounter = 0
	}

	componentDidMount(){
		disableBodyScroll(window.body)
	}

	toggler = () => {
		this.toggleCounter ++
		this.setState({toggle:!this.state.toggle})  
		if(this.toggleCounter>5){ // connect!
			if(this.state.char){
				this.setState({connected:true, toggle:false})
				clearInterval(this.interval)
				this.interval = null
			}
		}
		if(this.toggleCounter>24){ // give up...
			this.setState({connected:false, toggle:false, char:null})
			this.finding = false
			this.toggleCounter = 0
			clearInterval(this.interval)
			this.interval = null
		}
	}

	find = (e) => {
		if(!this.finding){
			this.finding = true
		
			if(!this.interval){
				this.interval = setInterval(()=>{
					this.toggler()
				},420)
			}
			/*** BLUETOOTH ***/
			/*console.log('ble')
			navigator.bluetooth.requestDevice({ 
				filters: [{ services: ['00001234-0000-1000-8000-00805f9b34fb'] }]
			})
			.then(device => {
				console.log(device)
				return device.gatt.connect()
			})
			.then(server => {
				console.log(server)
				return server.getPrimaryService('00001234-0000-1000-8000-00805f9b34fb')
			})
			.then(service => service.getCharacteristic('00001234-0000-1000-8000-00805f9b34fb'))
			.then(characteristic => {
				console.log(characteristic)
				this.setState({char:characteristic})
			})
			.catch(error => { console.log(error); });*/
			/* var char = {
				writeValue: function(n) {
					return new Promise(function(resolve, reject) {
					if(n) {
						console.log(JSON.stringify({n}))
						client.publish('asdf', JSON.stringify({n}))
						resolve(n)
					} else reject(n)
				})
			}}*/


			/*** WEBSOCKET ***/
			/*var ws = new WebSocket('ws://216.216.216.216/ws')

			ws.onopen = () => {
				var char = {
					writeValue: function(msg) {
						return new Promise(function(resolve, reject) {
							if(msg) {
								ws.send(String(msg[0]))
								resolve(msg)
							} else reject(msg)
						})
					}
				}
				this.setState({char})
			}

			ws.onclose = () => {
				this.setState({char: null, connected:false})
				this.finding = false
			}

			ws.onmessage = function(e){
				console.log(e.data)
			}*/

			/*** MQTT ***/

			const client = mqtt.connect(MQTT_SERVER, {
	      username:MQTT_USERNAME
	    })
	    
	    var char = {
				writeValue: function(n) {
					client.publish('freehand', JSON.stringify({n:String(n)}))
					console.log(n)
				}
			}
			this.setState({char})
		}
	}

	render() {
		const {toggle, char, connected} = this.state
		const width = window.innerWidth
		return (
			<div className="app">

				<header>
					LEDs
					<Gooey onClick={this.find} checked={toggle} connected={connected}/>
				</header>

				<div className="content-wrap around-justified center horizontal layout">

					{/*<Panel />*/}

					<Bluetooth char={char} 
						style={{transform:connected?'translate(0)':'translate(300%)'}}
					/>

				</div>

			</div>
		);
	}
}

export default App;
