# Library to aid javascript testing

## Installation

Global installation is recommended if you plan to use terminal commands in multiple projects

```
npm install -g @pawel-gawel/test-utils
```

In case you plan to leverage bootstrap scripts, you should install it as a project's dev dependency

```
npm install -save-dev @pawel-gawel/test-utils
```

## Terminal commands

When installed globally, program `test-utils` is available in the terminal.

One can find current usage by typing 

```
test-utils -h
```

### Create new test suit

To create new test suit, go with

```
test-utils create my-awesome-name
```

where `my-awesome-name` should be a dashed name of existing module to be covered by tests. It could also be relative path to existing file

```
test-utils create examples/my-awesome-component.jsx
```

Output file will have name of `my-awesome-name-test.ext`, where `ext` will be derived from existing module file (if there is one with maching name). If not, default `js` extension will be used.

#### Test templates

You can also specify which template you want to use for new test suit, like 

```
test-utils --template react my-awesome-component
```

Currently there are only `base` and `react` templates available.
