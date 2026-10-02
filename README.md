# Official Blazor Component for TinyMCE

## About

Official Blazor component for TinyMCE, the rich text editor. It wraps TinyMCE as a Blazor `<Editor />` component. By default, it pulls TinyMCE from the Tiny Cloud CDN unless configured to use a different setup, such as self-hosting the [tinymce Nuget package](https://www.nuget.org/packages/TinyMCE/).

## Quickstart

### Cloud CDN

1. [Sign up for a Tiny Cloud account](https://www.tiny.cloud/pricing/) to receive a Tiny Cloud API key.
1. Then in your Blazor project:
    1. Run `dotnet add package TinyMCE.Blazor`
    1. Include the following code:

        ```razor
        @using TinyMCE.Blazor

        <Editor ApiKey="your-api-key"
                @bind-Value="content"
                Conf="@(new Dictionary<string, object> { { "plugins", "lists link image table code help wordcount" } })" />

        @code {
            private string content = "<p>Initial content</p>";
        }
        ```
    1. Update the `ApiKey` parameter on the `Editor` component to include your Tiny Cloud API key.

For more information: [Using TinyMCE with Blazor - Cloud CDN](https://www.tiny.cloud/docs/tinymce/latest/blazor-cloud/).

### Self hosted

Using TinyMCE from Nuget in a Blazor project requires a couple of extra steps. See the documentation for more information: [Using TinyMCE with Blazor - Self hosted](https://www.tiny.cloud/docs/tinymce/latest/blazor-pm/).

## Detailed documentation

* [TinyMCE Blazor Technical Reference](https://www.tiny.cloud/docs/tinymce/latest/blazor-ref/).
* [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/latest/).

## Issues

Have you found an issue with `tinymce-blazor` or do you have a feature request? Open up an [issue](https://github.com/tinymce/tinymce-blazor/issues) and let us know or submit a [pull request](https://github.com/tinymce/tinymce-blazor/pulls). *Note: for issues related to TinyMCE please visit the [TinyMCE repository](https://github.com/tinymce/tinymce).*

## License

`tinymce-blazor` is licensed under the MIT License. See the [LICENSE.txt](https://github.com/tinymce/tinymce-blazor/blob/master/LICENSE.txt) file for details.

Depending on use case, the TinyMCE core editor can be used under either GPL-2.0-or-later or a commercial license. See the [tinymce package](https://www.nuget.org/packages/TinyMCE/) for details.
