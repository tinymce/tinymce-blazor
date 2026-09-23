# Official Blazor Component for TinyMCE

## About

Official Blazor component for [TinyMCE](https://github.com/tinymce/tinymce) rich text editor. It makes integrating TinyMCE into Blazor applications easy and seamless. It automatically pulls `tinymce` from the Tiny Cloud CDN unless configured to use a different setup, such as self-hosting the [tinymce NPM package](https://www.npmjs.com/package/tinymce).

## Quickstart

### Cloud CDN

In your Blazor project:

1. [Sign up for a Tiny Cloud account](https://www.tiny.cloud/pricing/) to receive a Tiny Cloud API key.
2. `dotnet add package TinyMCE.Blazor`
3. Include the following code:

```razor
@using TinyMCE.Blazor

<Editor ApiKey="your-api-key"
        @bind-Value="content"
        Conf="@(new Dictionary<string, object> { { "plugins", "lists link image table code help wordcount" } })" />

@code {
    private string content = "<p>Initial content</p>";
}
```

4. Update the `ApiKey` parameter on the `Editor` component to include your Tiny Cloud API key.

For more information: [Using TinyMCE with Blazor - Cloud CDN](https://www.tiny.cloud/docs/tinymce/8/blazor-cloud/).

### Self hosted via NPM package

Using TinyMCE from NPM in a Blazor project requires a couple of extra steps. See the documentation for more information: [Using TinyMCE with Blazor - Self hosted via NPM](https://www.tiny.cloud/docs/tinymce/8/blazor-pm/).

## Detailed documentation

* [TinyMCE Blazor Technical Reference](https://www.tiny.cloud/docs/tinymce/8/blazor-ref/).
* [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/8/).

## Issues

Have you found an issue with `tinymce-blazor` or do you have a feature request? Open up an [issue](https://github.com/tinymce/tinymce-blazor/issues) and let us know or submit a [pull request](https://github.com/tinymce/tinymce-blazor/pulls). *Note: for issues related to TinyMCE please visit the [TinyMCE repository](https://github.com/tinymce/tinymce).*

## License

`tinymce-blazor` is licensed under the MIT License. See the LICENSE.txt file for details.

Depending on use case, the TinyMCE core editor can be used under either GPL-2.0-or-later or a commercial license. See the [tinymce package](https://www.npmjs.com/package/tinymce) for details.
