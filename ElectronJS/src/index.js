const { app, BrowserWindow, Menu, ipcMain } = require('electron');
//Importamos el modulo url de node para manejo de url's
const url = require('url');
const path = require('path');

//Preguntamos si estamos en desarrollo o produccion
if(process.env.NODE_ENV !== 'production') {
    /* Configuramos electron-reload solo si estamos en desarrollo */
    require('electron-reload')(__dirname, {
        //Quiero que reinicies cuando se haya modificado cuando se haya registrado en otro usuario
        electron:path.join(__dirname, '../node_modules', '.bin', 'electretron')
    });

}

let mainWindow;
app.on("ready", ()=> {
    //Una vez  que carga creamos una nueva ventana
    mainWindow =  new BrowserWindow({});

    //Cargamos el archivo index.html a la ventana mainWindow
    mainWindow.loadURL(url.format({
        //Donde esta el archivo, que le indicamos con path.join, donde __dirname seria la carpeta local 
        pathname: path.join(__dirname, 'views/index.html'),
        //le decimos a traves de que protocolo lo va a cargar
        protocol: 'file',
        slashes: true
    }))

    //Creamos un menu a partir de un arreglo
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    //Integramos el el menu  a la ventana creada
    Menu.setApplicationMenu(mainMenu);

});

function crearVentana2() {
    ventana2 = new BrowserWindow({
        width:400,
        height: 330,
        title: 'Ventana 2',
        backgroundColor: '#008',
        resizable: false
    });

    ventana2.loadURL(url.format({
        pathname: path.join(__dirname, 'views/ventana2.html'),
        protocol: 'file',
        slashes: true
    }));

    ventana2.on('closed', ()=> {
        ventana2 = null;
    });
}





const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click() {
                    alert('New Product')
                }
            },

            {
                label: 'Eliminar todos los productos',
                click() {

                }
            }
        ]
    }, 

    {
        label: 'Ventana 1',
        click() {
            crearVentana2();
        }
    }
];


//Funcion de las diferentes ventanas