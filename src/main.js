
import { CapacitorFlash } from '@capgo/capacitor-flash';
import './style.css';

const button = document.querySelector('#torchButton');
const status = document.querySelector('#status');
const label = document.querySelector('#buttonLabel');
const hint = document.querySelector('#hint');
const subhint = document.querySelector('#subhint');

let isOn = false;
let busy = false;

function render() {
  document.body.classList.toggle('is-on', isOn);
  status.classList.toggle('on', isOn);
  status.innerHTML = `<i></i> ${isOn ? 'ON' : 'OFF'}`;
  label.textContent = isOn ? 'TAP TO TURN OFF' : 'TAP TO TURN ON';
  button.setAttribute('aria-label', isOn ? 'Turn flashlight off' : 'Turn flashlight on');
  hint.textContent = isOn
    ? 'Lighting up your surroundings.'
    : 'Your light, one tap away.';
  subhint.textContent = isOn
    ? 'LED flashlight is on'
    : 'LED flashlight control';
}

async function initialise() {
  try {
    const result = await CapacitorFlash.isAvailable();

    if (!result.value) {
      hint.textContent = 'No flashlight detected.';
      button.disabled = true;
      label.textContent = 'FLASHLIGHT UNAVAILABLE';
      return;
    }

    const current = await CapacitorFlash.isSwitchedOn();
    isOn = Boolean(current.value);
    render();
  } catch (error) {
    hint.textContent = 'Open this app on Android to use the flashlight.';
    subhint.textContent = 'Native flashlight access unavailable.';
  }
}

button.addEventListener('click', async () => {
  if (busy) return;

  busy = true;
  button.classList.add('busy');

  try {
    if (isOn) {
      await CapacitorFlash.switchOff();
      isOn = false;
    } else {
      await CapacitorFlash.switchOn();
      isOn = true;
    }

    render();
  } catch (error) {
    hint.textContent = 'Could not control the flashlight.';
    subhint.textContent = String(error?.message || error);
  } finally {
    busy = false;
    button.classList.remove('busy');
  }
});

document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible') {
    try {
      const current = await CapacitorFlash.isSwitchedOn();
      isOn = Boolean(current.value);
      render();
    } catch {}
  }
});

initialise();
