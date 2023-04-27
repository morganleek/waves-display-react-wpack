// Charts - React.js
import React, { useState, Component, Fragment } from "react";
import * as ReactDOM from 'react-dom/client';

import { Charts } from './chart/Chart';
import { Map } from './map/Map';

import "../scss/bundle.scss";

export class App extends Component {
	constructor( props ) {
    super( props );

    this.state = {
      showAll: ( wad.googleShowAllBuoys ) ? wad.googleShowAllBuoys : false,
      center: {
        lat: ( typeof( wad ) != "undefined" && 'googleLat' in wad ) ? parseFloat( wad.googleLat ) : 0.0,
        lng: ( typeof( wad ) != "undefined" && 'googleLng' in wad ) ? parseFloat( wad.googleLng ) : 0.0
      },
      zoom: ( window.innerWidth < 1200 ) ? 4 : 5,
      focus: null
    }

    // Bind this state so buttons state doesn't rise up
    this.updateMapCenter = this.updateMapCenter.bind( this );
    this.updateMapZoom = this.updateMapZoom.bind( this );
    this.updateFocus = this.updateFocus.bind( this );
  }

  updateMapCenter( newCenter ) {
    this.setState( { center: newCenter } );
  }
  
  updateMapZoom( newZoom ) {
    this.setState( { zoom: newZoom } );
  }

  updateFocus( buoyId ) {
    this.setState( { focus: buoyId } );
  }

  render() {
    const { showAll, center, zoom, focus } = this.state;
    
    return <>
      <Map showAll={ showAll } center={ center } zoom={ zoom } updateFocus={ this.updateFocus } />
      <Charts updateCenter={ this.updateMapCenter } 
              updateZoom={ this.updateMapZoom } 
              buoyFocus={ focus } />
    </>
  }
}

document.addEventListener( "DOMContentLoaded", function( event ) { 
  if( document.getElementsByClassName('page-template-wave-display-react').length ) {
    const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
    root.render(
      <App/>
    );
  }

  // News Message
  const closeNews = document.querySelector( '.close-me' );
  if( closeNews ) {
    closeNews.addEventListener( 'click', ( e ) => { 
      e.preventDefault();
      const news = document.querySelector( '.recent-news' );
      if( news ) {
        news.classList.add( 'collapse-me' );
      }
    } );
  }
} );

