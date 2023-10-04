import {Command, initEngine} from '@verza/sdk';
import {CommandParam} from '@verza/sdk';

const SERVER_TOKEN =
  'f9d49e0fd45ed376ed4dec14bb78afb8b4e66a2333871b195a8c160a60f68eae';

export default async function script() {
  //console.log(typeof process !== 'undefined' ? process.env : null);

  const engine = await initEngine({
    environment: 'dev',
    apiEndpoint: 'http://localhost',
    name: 'Web Server',
    accessToken: SERVER_TOKEN,
  });

  // command
  engine.commands.register(
    new Command('server', [new CommandParam('param', 'string')]).on(player => {
      player.sendMessage(`Hey from server`);
    }),
  );

  // event listener
  engine.network.onPlayerEvent('onRequestWelcome', async () => {
    engine.localPlayer.sendMessage(`Message received! Welcome to the server!`);
  });

  return engine;
}
