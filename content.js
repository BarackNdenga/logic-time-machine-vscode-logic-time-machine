// content.js - Injecté en MAIN world
// Initialise le tracer sur la page

// Créer script pour injecter recorder (es6 modules pas supportés en MAIN)
const script = document.createElement('script');
script.src = chrome.runtime.getURL('recorder/tracer.js');
script.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);

// Communication avec background/popup
window.addEventListener('message', (event) => {
  if (event.data.source !== 'logic-time-machine') return;
  
  if (event.data.action === 'getTimeline') {
    // window.tracer sera disponible si injecté
    const timeline = window.tracer ? window.tracer.getTimeline(event.data.variablePath) : [];
    event.source.postMessage({
      source: 'logic-time-machine',
      action: 'timelineData',
      data: timeline
    }, { targetOrigin: '*' });
  }
});

