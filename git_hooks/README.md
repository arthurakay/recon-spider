# Git `pre-push` hook

The `pre-push` hook can be used to check the following prior to submitting a new pull request:

* run all tests, and (`jest`)
* check all JS code for lint (`npm run lint`)

If either of those tasks fail locally, you will not be able to push your code to GitHub -- 
saving you considerable embarrassment and shame.

*Note:* the `pre-push` hook provided is designed to run on Linux/Unix only.

## Installation

From your terminal, `cd` to the root of the VUE project.

Then run:

    cp ./git_hooks/pre-push ./.git/hooks/
    sudo chmod 777 ./.git/hooks/pre-push

Now this shell script will run automatically any time you attempt to push your code to a remote Git repo.