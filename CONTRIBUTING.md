# Contributing

Thanks for your interest in contributing!

## Local Development

Since I do all my development work on macOS, all of these instructions have _only_ been tested on that OS.

### Prerequisites

Install required software:

* Install [Foundry VTT][foundry] v9
* Install Node v14

Make the

1. Find your Foundry VTT User Data directory (on macOS it's `~/Library/Application Support/FoundryVTT/Data`)
1. [Clone this repository][clone-instructions] to your machine
1. In your Foundry VTT User Data directory, open the `systems` folder
1. Create a symlink named `hero6e` to the root of the repository on your machine

[clone-instructions]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
[foundry]: https://foundryvtt.com

### Build process

1. Execute the following commands in the root of the repository:
   ```bash
   $ npm install
   $ npm run build
   ```
