
# Contributing

External contributors are free to submit PRs against the `master` branch.

In order for Tiny to accept your contribution, we will need legal permission from you to use your code. Please email `legal@tiny.cloud` with the subject `CLA request for [your Github username]`. Our legal team will send you a Contributors License Agreement (CLA) which you will need to sign and return.

## Development

### Starting the TinyMCE.BlazorDemoApp

This demo will re-compile the blazor editor component and has various demos for different use cases.

```
$ dotnet watch --project TinyMCE.BlazorDemoApp
```

### Msbuild actions

#### Cleans all build artifacts on all projects

```
$ dotnet clean
```

#### Builds all projects

```
$ dotnet build
```

### Building using docker

```
docker run -it --rm -v "$(pwd)":/app -w /app mcr.microsoft.com/dotnet/sdk:8.0 dotnet build
```

### Starting demo app in watch mode using docker

```
docker run -it --rm \
  -v "$(pwd)":/app \
  -w /app \
  -p 5277:5277 \
  -e DOTNET_USE_POLLING_FILE_WATCHER=true \
  mcr.microsoft.com/dotnet/sdk:8.0 \
  dotnet watch --project TinyMCE.BlazorDemoApp
```

