## Notes

Unfortunately, the release and publish process needs a few manual steps: updating docs in `nuget.org`.

- Pushing a new change in the master branch will trigger the release and publish process (don't forget to update the `CHANGELOG.md`). If the artifact is a newer version that the one avaiable in NuGet, it will publish the new package

- Once the new package has been published, `nuget.org` will revert the documentation to a blank state. Manually update the documentation

### Updating the documentation

1. Head over to `nuget.org` and log in.
2. Open the `TinyMCE.Blazor` package
3. Click  on `Manage package`
4. Open up the `Documentation` section
5. You can use the link to the github repo `README.md` at https://raw.githubusercontent.com/tinymce/tinymce-blazor/master/README.md

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

