import { getNextVersion } from 'shipjs-lib'; // eslint-disable-line import/no-unresolved
import runStep from '../runStep';

export default ({ currentVersion, dir }) =>
  runStep(
    { title: 'Calculating the next version.' },
    ({ print, info, warning, exitProcess }) => {
      const { version: nextVersion, ignoredMessages = [] } = getNextVersion(
        currentVersion,
        dir
      );
      if (ignoredMessages.length > 0) {
        print(
          warning(
            'The following commit messages out of convention are ignored:'
          )
        );
        ignoredMessages.forEach(message => print(`  ${message}`));
      }
      if (nextVersion === null) {
        print(info('Nothing to release!'));
        exitProcess(0);
      }
      return { nextVersion };
    }
  );
