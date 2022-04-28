import * as React from 'react';
import { createRoot }from 'react-dom/client';
import Playlist from './Playlist'
function render() {
  const root = createRoot(document.body)
  root.render(<Playlist />);
}

render();