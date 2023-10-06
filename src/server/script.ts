import {Command, initEngine} from '@verza/sdk';
import {CommandParam} from '@verza/sdk';

export default async function script() {
  const engine = await initEngine({
    environment: 'dev',
    apiEndpoint: 'http://localhost',
    name: 'Web Server',
    accessToken: process.env.VERZA_ACCESS_TOKEN,
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

script();
