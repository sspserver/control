# Control

Thank you for your interest in contributing to SSP Server Control! We welcome all contributions, whether they are bug reports, feature requests, documentation improvements, or code contributions.

## Docs

Read documentation [here](docs).

## Installation for development

Clone the repository:

```bash
git clone https://github.com/sspserver/control.git
cd control
```

Load submodules:

```bash
make init-submodules
```

Pull the submodules updates:

```bash
make init-submodules
```

## Development environment

To run full development environment, you need to run the following commands:

```bash
make run-all
```

It requires `docker` and `docker-compose` to be installed on your system.

### Environment cleanup

To clean up the environment in case if you need run everething from scratch, you can run the following command:

```bash
make reset-dev-env
```

The command destroys all containers, volumes and networks created by the `make run-all` command.

## Resources

* Animated SVG background <https://loading.io/background/>
* Illustrations source <https://www.figma.com/design/yKSeeDiBUPKL8qg7g5LZxl/1%2C600-Free-Illustrations---Vector-illustrations-set-(svg-png)-(Community)?node-id=110-63&t=4sfCIPfpRJtrtHdl-1>
