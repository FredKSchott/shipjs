import { hasLocalBranch, hasRemoteBranch } from 'shipjs-lib'; // eslint-disable-line import/no-unresolved
import runStep from '../runStep';

export default ({ config, nextVersion, dir }) =>
  runStep(
    { title: 'Preparing a staging branch' },
    ({ print, error, exitProcess }) => {
      const { getStagingBranchName, remote } = config;
      const stagingBranch = getStagingBranchName({ nextVersion });
      if (hasLocalBranch(stagingBranch, dir)) {
        print(error(`The branch "${stagingBranch}" already exists locally.`));
        print('Delete the local branch and try again. For example,');
        print(`  $ git branch -d ${stagingBranch}`);
        exitProcess(1);
      }
      if (hasRemoteBranch(remote, stagingBranch, dir)) {
        print(error(`The branch "${stagingBranch}" already exists remotely.`));
        print('Delete the remote branch and try again. For example,');
        print(`  $ git push ${remote} :${stagingBranch}`);
        exitProcess(1);
      }
      return { stagingBranch };
    }
  );
