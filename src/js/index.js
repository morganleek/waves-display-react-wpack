// Charts - React.js
import React, { useState, useEffect, Component, Fragment } from "react";
import * as ReactDOM from 'react-dom/client';

import { Charts } from './chart/Chart';
import { Map } from './map/Map';

import "../scss/bundle.scss";

export default function App( props ) {
  // States
  const [showAll, setShowAll] = useState( ( wad.googleShowAllBuoys ) ? wad.googleShowAllBuoys : false );
  const [center, setCenter] = useState( 
    {
      lat: ( typeof( wad ) != "undefined" && 'googleLat' in wad && wad.googleLat !== '' ) ? parseFloat( wad.googleLat ) : 0.0,
      lng: ( typeof( wad ) != "undefined" && 'googleLng' in wad && wad.googleLng !== '' ) ? parseFloat( wad.googleLng ) : 0.0
    }
  );
  const [zoom, setZoom] = useState( ( window.innerWidth < 1200 ) ? 4 : 5 );
  const [focus, setFocus] = useState( null );

  useEffect( ( ) => {
    // Props loaded via javascript globals 
    // No need to setup anything but reload 
    // when zoom and center change.
  }, [ zoom, center ] );

  const updateMapCenter = ( newCenter ) => {
    setCenter( newCenter );
    setZoom( 10 );
  }
  
  const updateMapZoom = ( newZoom ) => {
    console.log( newZoom );
    setZoom( newZoom );
  }

  const updateFocus = ( buoyId ) => {
    setFocus( buoyId );
  }

  return (
    <>
      <Map 
        showAll={ showAll } 
        center={ center } 
        zoom={ zoom } 
        updateFocus={ updateFocus } 
      />
      <Charts 
        updateCenter={ updateMapCenter } 
        updateZoom={ updateMapZoom } 
        buoyFocus={ focus } 
      />
    </>
  );
}

document.addEventListener( "DOMContentLoaded", function( event ) { 
  if( document.getElementById( 'waves-maps-and-charts' ) ) {
    const root = ReactDOM.createRoot( document.getElementById( 'waves-maps-and-charts' ) );
    root.render( <App /> );
  }
  else if( document.getElementsByClassName('page-template-wave-display-react').length ) {
    const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
    root.render( <App/> );
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

