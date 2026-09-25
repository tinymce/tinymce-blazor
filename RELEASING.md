# Releasing

Pushing a new change in the `master` branch will trigger the release and publish process (don't forget to update the `CHANGELOG.md`). If the version of the artifact is newer than the one available in NuGet, it will publish the new package.

Once the new package has been published, `nuget.org` will revert the documentation to a blank state. Manually update the documentation.

## Updating the documentation

1. Head over to `nuget.org` and log in.
2. Open the `TinyMCE.Blazor` package
3. Click on `Manage package`
4. Open up the `Documentation` section
5. You can use the link to the github repo `README.md` at htt◊ps://raw.githubusercontent.com/tinymce/tinymce-blazor/master/README.md
