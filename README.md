# Working on nfts

Pasos a seguir para trabajar con Hardhat:

- Crear el proyecto
  Para crear el prooyecto utilizaremos el comando npx hardhat
  La estructura resultante contendrá los siguientes archivos i directorios entre otros:

  - Un directorio contracts con los contratos inteligentes a desplegar.
  - Una carpeta artifacts con el material resultante de la compilación del contrato.
  - Una carpeta scripts que contiene el archivo .js encargado de ejcutar el despliegue.
  - Un archivo hardhat.config.js con la configuración necesaria para el despliegue.

- Editar el archivo hardhat.config
  En este caso tendríamos dos opciones: - Configurar para el despliegue en un nodo local:
  module.exports = {
  solidity: "0.8.4"
  };

 - Configurar para el despliegue en una red remota. En este caso utilizaremos la testnet de Polygon (Mumbai).
        ```
        module.exports = {
          defaultNetwork: "matic",
          networks: {
            hardhat: {},
            matic: {
              url: "https://rpc-mumbai.maticvigil.com",
              accounts: [process.env.PRIVATE_KEY],
            },
          },
          etherscan: {
            apiKey: process.env.API_KEY,
          },
          solidity: {
            version: "0.8.4",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200,
              },
            },
          },
        };
        ```

        La clave PRIVATE_KEY será de la wallet que vamos a emplear para hacer el despliegue.

        Agregamos también la API_KEY de PolygonScan para poder verificar allí el contrato.

- Si vamos a trabajar en local deberemos ejecutar npx hardhat node

- Si vamos a trabajar en remoto con la red de pruebas necesitare fondos para hacer el despliegue. Para ello, iremos a una faucet y pediremos que nos envíen fondos a nuestra wallet:

<img src="./readme-images/faucet.png" alt="faucet" />

- Nos llegarán los fondos a la wallet que le hamos indicado

<img src="./readme-images/metamask.png" alt="metamask" />

- Compilar los contratos:
  Utilizaremos el comando npx hardhat compile

- Desplegar los contratos:
  Emplearemos npx hardhat run scripts/sample-script.js aunque si vamos a desplegar en local es aconsejable utilizar npx hardhat run --network localhost scripts/sample-script.js para no tener problemas al arrancar el nodo en una consola y hacer el despliegue en otra.

- Comprobar el despliegue en polygonscan (para despliegues a una network remota):

<img src="./readme-images/polygonscan.png" alt="polygonscan" />
