# Development environment

Development environment for the control pane for SSP server is based on Docker and Docker Compose.
It immitates the production environment as close as possible with saving of resources on the host machine.

## Getting Started

To run full development environment, you need to run the following commands:

```bash
make run-all
```

It requires `docker` and `docker-compose` to be installed on your system.

## Environment cleanup

To clean up the environment in case if you need run everething from scratch, you can run the following command:

```bash
make reset-dev-env
```

The command destroys all containers, volumes and networks created by the `make run-all` command.
