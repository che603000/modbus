// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

let value = false;

const writeCoil = (id, addr, value) => {
    client.setID(id);
    return client.writeCoil(addr, value);
}

const readCoils = (id, addr) => {
    client.setID(id);
    return client.readCoils(addr, 8)
        .then(d => {
            return d.data.slice(0, 4)
        })
        .then(d => console.log(d))
        .catch(err => {
            console.log(err);
        })
}

const start = (err) => {
    setInterval(() => {
        value = !value;
        writeCoil(1, 19, value)
            .then(() => readCoils(1, 16))
            .catch(err => {
                debugger;
                if(err.errno === 'ECONNREFUSED'){
                    client.connectRTU("COM5", {baudRate: 19200});
                    
                }
                console.log(err)
            });


    }, 3000)

    //read();
}

// open connection to a serial port
client.connectRTU("COM5", {baudRate: 19200})
    .then(()=> start())
    .catch(err => {
        console.log(err);
    })
client.setTimeout(500);


