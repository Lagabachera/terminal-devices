//Función que se llama al iniciar la aplicación.
function OnStart()
{
    //Crear un layout lineal para organizar los elementos de la interfaz.
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );
    lay.SetBackColor( "#ffffff" );

    //Crear una caja de texto para mostrar la salida de la terminal.
    txtOutput = app.CreateText( "", 0.95, 0.7, "Multiline,Left" );
    txtOutput.SetMargins( 0, 0.01, 0, 0, "dip" );
    txtOutput.SetBackColor( "#000000" );
    txtOutput.SetTextColor( "#00FF00" );
    txtOutput.SetTextSize( 16 );
    lay.AddChild( txtOutput );

    //Crear un cuadro de texto para ingresar comandos.
    cmdInput = app.CreateTextEdit( "", 0.95, 0.1, "SingleLine" );
    cmdInput.SetHint( "Escribe un comando..." );
    cmdInput.SetBackColor( "#DDDDDD" );
    lay.AddChild( cmdInput );

    //Crear un botón para enviar el comando.
    btnSend = app.CreateButton( "Ejecutar Comando", 0.5, 0.1 );
    btnSend.SetOnTouch( ExecuteCommand );
    lay.AddChild( btnSend );

    //Agregar el layout a la aplicación.
    app.AddLayout( lay );

    //Crear el proceso del sistema que permitirá ejecutar los comandos.
    sys = app.CreateSysProc( "sh" );
    sys.SetOnInput( sys_OnInput );
    sys.SetOnError( sys_OnError );
}

//Función que se llama cuando el usuario presiona el botón para enviar el comando.
function ExecuteCommand() {
    //Obtener el comando ingresado por el usuario.
    var command = cmdInput.GetText();

    //Limpiar la entrada de texto después de enviar el comando.
    cmdInput.SetText( "" );

    //Mostrar el comando ingresado en la salida.
    txtOutput.SetText( txtOutput.GetText() + "\n> " + command + "\n" );

    //Ejecutar el comando en la terminal del sistema.
    sys.Out( command + "\n" );
}

//Función que maneja la salida de los comandos (output).
function sys_OnInput( data ) {
    //Mostrar el resultado del comando en la salida.
    txtOutput.SetText( txtOutput.GetText() + data + "\n" );
}

//Función que maneja errores al ejecutar comandos.
function sys_OnError( data ) {
    //Mostrar el error en rojo en la salida.
    txtOutput.SetText( txtOutput.GetText() + "ERROR: " + data + "\n" );
}