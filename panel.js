// devtools/panel.js - UI Timeline interactive
// Connecte au content script via runtime port

class TimeMachinePanel {
  constructor() {
    this.port = chrome.runtime.connect({name: 'timeMachinePanel'});
    this.initUI();
    this.port.onMessage.addListener(this.handleMessage.bind(this));
  }

  initUI() {
    document.getElementById('query').onclick = () => this.queryTimeline();
    document.getElementById('clear').onclick = () => this.clearTraces();
  }

  async queryTimeline() {
    const path = document.getElementById('varPath').value;
    if (!path) return;

    // Send to content via background
    this.port.postMessage({
      action: 'getTimeline',
      variablePath: path
    });

    document.getElementById('status').textContent = `Recherche ${path}...`;
  }

  handleMessage(msg) {
    if (msg.action === 'timelineData') {
      this.renderTimeline(msg.data);
    }
  }

  renderTimeline(changes) {
    const container = document.getElementById('timeline');
    container.innerHTML = '';

    if (!changes.length) {
      container.innerHTML = '<p>Aucune trace pour cette variable.</p>';
      return;
    }

    changes.forEach((change, i) => {
      const div = document.createElement('div');
      div.className = 'change';
      div.innerHTML = `
        <div>T${change.timestamp.toFixed(0)}ms: <span class="value">${safeStringify(change.value)}</span></div>
`${s.file}:${s.line}`
        <small>${change.context} #${change.traceId.slice(-8)}</small>
      `;
      div.onclick = () => this.openSource(change.stack[0]);
      container.appendChild(div);
    });

    document.getElementById('status').textContent = `${changes.length} changements trouvés`;
  }

  openSource(frame) {
    if (frame) {
      chrome.runtime.sendMessage({
        action: 'openSource',
        file: frame.file,
        line: frame.line
      });
    }
  }

  clearTraces() {
    this.port.postMessage({action: 'clearTraces'});
  }
}

new TimeMachinePanel();

