import React from 'react';

const ArduinoCode = (props) => {
 return (
  <div className="arduino-code">
  <pre style={{margin:0, fontSize:'12px',lineHeight:'16px'}}>
  <font color="#5e6d03">#include</font> <font color="#434f54">&lt;</font><b><font color="#d35400">SoftwareSerial</font></b><font color="#434f54">.</font><font color="#000000">h</font><font color="#434f54">&gt;</font>
  <br />
  <b><font color="#d35400">SoftwareSerial</font></b> <b><font color="#d35400">XBee</font></b><font color="#000000">(</font><font color="#000000">2</font><font color="#434f54">,</font> <font color="#000000">3</font><font color="#000000">)</font><font color="#000000">;</font>
  <br /><br />
  <font color="#00979c">void</font> <font color="#5e6d03">setup</font><font color="#000000">(</font><font color="#000000">)</font> <font color="#000000">{'{'}</font>
  <br />
   &nbsp;<b><font color="#d35400">Serial</font></b><font color="#434f54">.</font><font color="#d35400">begin</font><font color="#000000">(</font><font color="#000000">9600</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;<font color="#d35400">pinMode</font><font color="#000000">(</font><font color="#000000">13</font><font color="#434f54">,</font> <font color="#00979c">OUTPUT</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;<b><font color="#d35400">XBee</font></b><font color="#434f54">.</font><font color="#d35400">begin</font><font color="#000000">(</font><font color="#000000">9600</font><font color="#000000">)</font><font color="#000000">;</font>
  <br />
  <font color="#000000">}</font>
  <br />
  <br />
  <font color="#00979c">unsigned</font> <font color="#00979c">int</font> <font color="#000000">integerValue</font><font color="#434f54"> = </font><font color="#000000">0</font><font color="#000000">;</font>
  <br />
  <font color="#00979c">char</font> <font color="#000000">incomingByte</font><font color="#000000">;</font>
  <br />
  <br />
  <font color="#00979c">void</font> <font color="#5e6d03">loop</font><font color="#000000">(</font><font color="#000000">)</font> <font color="#000000">{'{'}</font>
   &nbsp;
   <br />
   &nbsp;<font color="#5e6d03">if</font> <font color="#000000">(</font><b><font color="#d35400">Serial</font></b><font color="#434f54">.</font><font color="#d35400">available</font><font color="#000000">(</font><font color="#000000">)</font> <font color="#434f54">&gt;</font> <font color="#000000">0</font><font color="#000000">)</font> <font color="#000000">{'{'}</font>
   <br />
   &nbsp;&nbsp;&nbsp;<font color="#d35400">digitalWrite</font><font color="#000000">(</font><font color="#00979c">LED_BUILTIN</font><font color="#434f54">,</font> <font color="#00979c">HIGH</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;<font color="#000000">integerValue</font> <font color="#434f54">=</font> <font color="#000000">0</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;<font color="#5e6d03">while</font><font color="#000000">(</font><font color="#000000">1</font><font color="#000000">)</font> <font color="#000000">{'{'}</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#000000">incomingByte</font> <font color="#434f54">=</font> <b><font color="#d35400">Serial</font></b><font color="#434f54">.</font><font color="#d35400">read</font><font color="#000000">(</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#434f54">&#47;&#47; break on newline character sent from websocket</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#5e6d03">if</font> <font color="#000000">(</font><font color="#000000">incomingByte</font> <font color="#434f54">==</font> <font color="#00979c">&#39;\n&#39;</font><font color="#000000">)</font> <font color="#5e6d03">break</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#5e6d03">if</font> <font color="#000000">(</font><font color="#000000">incomingByte</font> <font color="#434f54">==</font> <font color="#434f54">-</font><font color="#000000">1</font><font color="#000000">)</font> <font color="#5e6d03">continue</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#000000">integerValue</font> <font color="#434f54">*=</font> <font color="#000000">10</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#434f54">&#47;&#47; convert ASCII to int, add, and leftshift</font>
   <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#000000">integerValue</font> <font color="#434f54">=</font> <font color="#000000">(</font><font color="#000000">(</font><font color="#000000">incomingByte</font> <font color="#434f54">-</font> <font color="#000000">48</font><font color="#000000">)</font> <font color="#434f54">+</font> <font color="#000000">integerValue</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;<font color="#000000">}</font>
   <br />
   &nbsp;&nbsp;&nbsp;<b><font color="#d35400">Serial</font></b><font color="#434f54">.</font><font color="#d35400">println</font><font color="#000000">(</font><font color="#000000">integerValue</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;<b><font color="#d35400">XBee</font></b><font color="#434f54">.</font><font color="#d35400">write</font><font color="#000000">(</font><font color="#000000">integerValue</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;&nbsp;&nbsp;<font color="#d35400">digitalWrite</font><font color="#000000">(</font><font color="#00979c">LED_BUILTIN</font><font color="#434f54">,</font> <font color="#00979c">LOW</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
   &nbsp;<font color="#000000">}</font>
   <br />
   &nbsp;<font color="#d35400">delay</font><font color="#000000">(</font><font color="#000000">1</font><font color="#000000">)</font><font color="#000000">;</font>
   <br />
  <font color="#000000">}</font>
  <br />
  </pre>
  </div>)
}

export default ArduinoCode
