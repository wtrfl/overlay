//const { remote } = require('electron')
//const { BrowserWindow } = remote
//const { BrowserWindow } = require('electron').remote
//const { ipcRenderer } = require('electron')

const Tail = require('tail').Tail;
window.$ = window.jQuery = require('jquery');

const tail = new Tail(logpath, { useWatchFile: true, nLines: 1, fsWatchOptions: { interval: 100 } });

tail.on('line', (data) => {

    const k = data.indexOf('[CHAT]');
    if (k === -1) return;

    const msg = data.substring(k + 7);

    if (msg.indexOf('has joined') !== -1 && msg.indexOf(':') === -1) {
        if (config.get('settings.shrink', true)) {
            currentWindow.setSize(currentWindow.webContents.getOwnerBrowserWindow().getBounds().width, winheight, true);
            $('#show').css('transform', 'rotate(0deg)');
        }
        if ($('#infodiv').css('display') === 'none' && $('#settingsdiv').css('display') === 'none') {
            $('#titles').css('display', 'block');
            $('#indexdiv').css('display', 'block');
        }
        if (msg.indexOf('/') !== -1) numplayers = Number(msg.substring(msg.indexOf('(') + 1, msg.indexOf('/')));
        let join = msg.split(' ')[0];
        let contains = false;
        for (let i = 0; i < players.length; i++) { if (join === players[i].name) { contains = true; } }
        if (!contains) addPlayer(join);
    }

})





//currentWindow = remote.BrowserWindow.getAllWindows();
//currentWindow = currentWindow[0];

/*document.getElementById('minimize').addEventListener('click', () => {
    currentWindow.minimize();
})

$('#quit').on('click', () => {
    currentWindow.close();
    app.quit();
})

$('#minimize').on('click', () => {
    currentWindow.minimize();
})*/