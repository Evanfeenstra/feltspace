import React, { Component } from 'react';

class Gooey extends Component {
  render() {
    const {connected, onClick} = this.props
    return (
      <div className="gooey">

        <nav className="menu">
          <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"
            checked={this.props.checked}/>
          <label className={`menu-open-button${connected?' animatez':''}`} htmlFor="menu-open"
          onClick={onClick}>
            {/*<span class="hamburger hamburger-1"></span>
            <span class="hamburger hamburger-2"></span>
            <span class="hamburger hamburger-3"></span>*/}
          </label>
          <a className="menu-item"> <i className="fa fa-bar-chart"></i> </a>
          <a className="menu-item"> <i className="fa fa-plus"></i> </a>
          <a className="menu-item"> <i className="fa fa-heart"></i> </a>
          <a className="menu-item"> <i className="fa fa-envelope"></i> </a>
          <a className="menu-item"> <i className="fa fa-cog"></i> </a>
        </nav>

        <svg version="1.1">
          <defs>
            <filter id="shadowed-goo">
                
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                <feBlend in2="shadow" in="goo" result="goo" />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
      </svg>

      </div>
    );
  }
}

export default Gooey;
