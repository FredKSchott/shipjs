<h1 align="center">🛳 Ship.js</h1>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/shipjs">

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/gh/algolia/shipjs">

  <img alt="NPM" src="https://img.shields.io/npm/l/shipjs">
</p>

<p align="center">
  Take control of what is going to be your next release.
</p>

## Why 🤷🏻‍

Coding is fun, debugging and testing are okay, but releasing is NOT.

When releasing, you go through something like the following:

- Update the version in `package.json`
- Update the changelog
- Actually release it (e.g. `yarn build && yarn publish`)
- Create a git tag

### What could go wrong?

- You might make mistakes during the release.
   - Environments are different across your team members.
   - You're releasing alone because the whole process happens on your local machine.
   - It's not your everyday-job. Mistakes can happen.
- You are blocked and cannot do anything else until it's done.
   - Even if you have a release script, you need to watch until the script finishes well.
   - You don't want to switch to another feature branch and work there until the script finishes.

## How to solve them❓

In Ship.js, the release process consists of three parts.

### Part 1. Preparation (`shipjs prepare`)

![Preview](preview.gif)

Run `shipjs prepare` and it will briefly do the following:

- Figure out next version.
- Update the version and changelog.
- Create a pull request.

It takes less than a couple of minutes.

### Part 2. Review

- Review the PR by yourself, or with your colleagues.
- Add more commits to the PR if you want.
- You can hold the release, build from the staging branch and test it manually.
- If you want to cancel the release, just close the PR and delete the staging branch.

When you think it's ready to release, merge the PR.

### Part 3. Trigger a release (`shipjs trigger`)

Run `shipjs trigger` and it will briefly do the following:

- Run a final test (unit, e2e, etc).
- Release it to NPM (or elsewhere as you configure it).
- Create a git tag for the version.

You can manually run `shipjs trigger` on the base branch after the PR is merged.

However you can also configure your CI service(e.g. CircleCI) to do this for you. It means the longest process is on the CI service asynchronously, not occupying your working environment.

## A little deeper look ⁉️

Let's assume the following situation:

- Current branch: `master`
- Currently released version: `1.0.0`
- Next version: `1.0.1` (because there are only commits like `chore: `, `fix: `, ...)

### Part 1. Preparation (`shipjs prepare`)

On your terminal, run `shipjs prepare` and it will briefly do the following:

- `git checkout -b releases/v1.0.1`
- Update the version in `package.json`.
- Update the changelog.
- `git commit -m "chore: release v1.0.1`
- Create a PR from `releases/v1.0.1` to `master`.

You can run `shipjs prepare --dry-run` just to see what will be executed without actual execution.

### Part 2. Review

You will review and merge this PR.

You can add more commits to this PR if needed.

According to your merge strategy, you might either `Squash and merge` or `Merge pull request`.

For more information, please refer to the mergeStrategy section of the [guide](./GUIDE.md#mergestrategy).

### Part 3. Trigger a release (`shipjs trigger`)

On your terminal, `git pull` on `master` branch. And run `shipjs trigger`. It will check the following conditions whether it should proceed releasing or not.

- if it's `master` branch now
- if the latest commit message is like `chore: releases v1.0.1 (#xx)`

If the conditions are met, `shipjs trigger` will briefly do the following:

- Send a Slack message to notify the beginning of the release(If configured).
- Run test, build and release it.
- `git tag v1.0.1`
- Push them to git remote and notify at Slack.

You can run `shipjs trigger --dry-run` just to see what will be executed without actual execution.

And you can configure your CI service to run the Part 3 on behalf of you. What you need to do is just to make it run `shipjs trigger` every time there is a new commit. It's okay to do so because `shipjs trigger` triggers release only when the conditions are met. If not, it skips.

## Installation

```bash
npm install --save-dev shipjs

or

yarn add -D shipjs
```

Add the following to the `scripts` section in your `package.json`.

```js
"release:prepare": "shipjs prepare",
"release:trigger": "shipjs trigger",
```

Do you want to set it up now? Then, let's move on to the [GUIDE.md](./GUIDE.md).

## How is it different from semantic-release?

**semantic-release** is a tool for `fully automated version management and package publishing`.

Ship.js provides a kind of half automation, which rather gives you a chance to:

- Confirm the next version is actually correct which is semantically bumped
- Check which commits are going to be released and discuss with colleagues
- Check the automatically generated changelog and refine it
- Put the release aside for a second, build a test package for the PR and test it in another environments(Possibly [Pika CI](https://github.com/apps/pika-ci) can be used here).

## Contributing

You can create an issue for bug, feature request or your opinion.

And we also appreciate your PRs. The detailed contribution guide is coming soon.

## Getting Started

Let's move on to the [GUIDE.md](./GUIDE.md).
