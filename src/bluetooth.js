import React, { Component } from 'react';
import HSVtoRGB from './HSVtoRGB'
import {DraggableCore} from 'react-draggable'

class Bluetooth extends Component {

  constructor(){
    super()
    this.isWrittingGATT = false
  }

  componentDidMount(){
    this.ctx=this.canvas.getContext("2d")
    this.bleQueue = []  // 
    this.val = []
    this.numLeds = []
    var num = 0
    for(var j=0; j<19; j++){
      this.val[j] = []
      this.numLeds[j] = []
      var odd = j%2;
      for(var i=0; i<13+odd; i++) {
        this.val[j][i] = 255;
        this.numLeds[j][i] = Math.abs(12*odd+27*j*odd-num) // numLeds is a snaked LED layout 
        num++
      }
    }
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    for(var j=0; j<19; j++){
      var odd = j%2;
      for(var i=0; i<13+odd; i++) {
        let c = null;
        if(this.val[j] && this.val[j][i]<255){
          this.val[j][i]+=5
          //color circle
          c = HSVtoRGB((this.val[j][i]-28)/255, 1, 1) // Math.floor(this.val[j][i]/2.55)
        } else {
          c = {r:255,g:255,b:255}
        }
        this.circle(i*19+19-odd*9, j*17+10, 9, "rgb("+c.r+","+c.g+","+c.b+")") //draw all circles
      }
    }
    if(this.bleQueue.length>0){
      /*** BLUETOOTH ***/
      // get last value in bleQueue
      /*var resetChar = new Uint8Array([this.bleQueue[this.bleQueue.length-1]]) 
      if(!this.isWrittingGATT) {
        this.isWrittingGATT = true
        this.props.char.writeValue(resetChar)
        .then(()=>{
          this.bleQueue.pop()
          this.isWrittingGATT = false
        })
        .catch(err=>{
          console.log(err)
        })
      }*/

      /*** MQTT ***/
      this.props.char.writeValue(this.bleQueue.pop())
    }
    window.requestAnimationFrame(this.loop.bind(this));
  }

  addPixel(e){
    //mouse
    let coords={x:e.offsetX, y:e.offsetY}
    //touch
    if(e.targetTouches){
      const rect = e.target.getBoundingClientRect()
      coords = {
        x:Math.round(e.targetTouches[0].pageX - rect.left), 
        y:Math.round(e.targetTouches[0].pageY - rect.top)
      }
    }
    var x = Math.floor((coords.x - 5) / 18.78 )
    var y = Math.floor((coords.y - 1) / 17.15 )
    if(x>-1 && x<14 && y>-1 && y<19){
      var LED = this.numLeds[y][x]; //
      if(LED+1){
        this.oldmessage = this.message
        this.message = LED + 1
        if(this.oldmessage !== this.message) {
          this.val[y][x] = 0; //change color in canvas
          this.bleQueue.unshift(255-LED) //add LED to que at beginning
        }
      }
    }
  }

  circle(x, y, r, color){
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#666666';
    this.ctx.stroke();
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  handleStart(e) {
    e.preventDefault()
    if(e.target.id==='canvas'){
      this.addPixel(e)
    }
  }

  handleDrag(e) {
    e.preventDefault()
    if(e.path[0].id==='canvas'){
      this.addPixel(e)
    }
  }

  render() {
    return (
      <div className="bluetooth" style={this.props.style}>
        <DraggableCore
          onStart={this.handleStart.bind(this)}
          onDrag={this.handleDrag.bind(this)}>
          <canvas ref={r=>this.canvas=r} width="267" height="326" id="canvas"></canvas>
        </DraggableCore>
      </div>
    );
  }
}

export default Bluetooth;