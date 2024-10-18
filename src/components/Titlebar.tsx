import { useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import '../Titlebar.css';
import icon from '../assets/quill_16x16 — копия.png';



const appWindow = getCurrentWindow();

export default function Titlebar() {
  useEffect(() => {
    const minimizeBtn = document.getElementById('titlebar-minimize');
    const maximizeBtn = document.getElementById('titlebar-maximize');
    const closeBtn = document.getElementById('titlebar-close');

    minimizeBtn?.addEventListener('click', () => appWindow.minimize());
    maximizeBtn?.addEventListener('click', () => appWindow.toggleMaximize());
    closeBtn?.addEventListener('click', () => appWindow.close());

    // Убираем обработчики при размонтировании компонентов
    return () => {
      minimizeBtn?.removeEventListener('click', () => appWindow.minimize());
      maximizeBtn?.removeEventListener('click', () => appWindow.toggleMaximize());
      closeBtn?.removeEventListener('click', () => appWindow.close());
    }

  }, []);
    return (
        <div data-tauri-drag-region className="titlebar" >
          <img src={icon}/>
            <h1 className="title-label">Quill</h1>
            <div className='title-btns'>
              <div className="titlebar-button" id="titlebar-minimize">
                  <img src="https://api.iconify.design/mdi:window-minimize.svg"
                       alt="minimize"
                    />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
                  <img src="https://api.iconify.design/mdi:window-maximize.svg"
                       alt="maximize"
                  />
            </div>
            <div className="titlebar-button" id="titlebar-close">
                  <img src="https://api.iconify.design/mdi:close.svg"
                       alt="close"
                  />
                  
            </div>
          </div>
        </div>
    );
}