# TinyMCE Blazor component

## About

This package is a wrapper around [TinyMCE](https://github.com/tinymce/tinymce) to facilitate its use in Blazor applications.

* If you need detailed documentation on TinyMCE, see: [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/7/).
* For the TinyMCE Blazor Quick Start, see: [TinyMCE Documentation - Blazor Integration](https://www.tiny.cloud/docs/tinymce/7/blazor-cloud/).
* For the TinyMCE Blazor Technical Reference, see: [TinyMCE Documentation - TinyMCE Blazor Technical Reference](https://www.tiny.cloud/docs/tinymce/7/blazor-ref/).

### Issues

Have you found an issue with `tinymce-blazor` or do you have a feature request? Open up an [issue](https://github.com/tinymce/tinymce-blazor/issues) and let us know or submit a [pull request](https://github.com/tinymce/tinymce-blazor/pulls). *Note: for issues related to TinyMCE please visit the [TinyMCE repository](https://github.com/tinymce/tinymce).*

## TinyMCE Quick Start guide

### Create a new project and add the TinyMCE.Blazor component

#### From the command line

Create a new project

`dotnet new blazorserver -o BlazorApp --no-https`

Go into your new directory

`cd BlazorApp`

Install the TinyMCE Blazor integration

`dotnet add package TinyMCE.Blazor`

Verify by checking the `ItemGroup` references in `BlazorApp.csproj`

```
  <script src="_framework/blazor.server.js"></script>
  <script src="_content/TinyMCE.Blazor/tinymce-blazor.js"></script>
  ...
```

#### Using Visual Studio

On your Visual Studio select `New Project` and `Blazor Server App` template.

Use the NuGet package manager console and install the `tinyMCE.Blazor` package using `Install-Package TinyMCE.Blazor`

### Using the Editor Component

Add the Editor component to your page

You can use the component name only with the `using` directive

```
@using TinyMCE.Blazor
<Editor />
```

Or you can refer to the component using its package name
```
<TinyMCE.Blazor.Editor />
```

To use the Editor output you can access the `Value` property or the read-only `Text` property.

For code samples check out this [Blazor sample project using the TinyMCE Blazor integration](https://github.com/jscasca/tinymce-blazor-sample)

## TinyMCE Blazor technical reference

### Configuring the TinyMCE Blazor integration

The editor component accepts the following properties:

```
<Editor
  Id="uuid"
  Inline=false
  CloudChannel="7"
  Value=""
  Disable=false
  JsConfSrc="<path_to_jsObj>"
  Conf="@yourConf"
  ApiKey="your-api-key"
  LicenseKey="your-license-key"
  ClassName="tinymce-wrapper"
/>
```

None of the configuration properties are required for TinymceBlazor to work.

#### ApiKey

Tiny Cloud API key. Required for deployments using the Tiny Cloud to provide the TinyMCE editor.

Default value: no-api-key
Type: string

##### Example using ApiKey
```
<Editor
  ApiKey="your-api-key"
/>
```

#### CloudChannel

Specifies the Tiny Cloud channel to use. For more information on TinyMCE development channels, see: [Specifying the TinyMCE editor version deployed from Cloud - dev, testing, and stable releases](https://www.tiny.cloud/docs/cloud-deployment-guide/editor-plugin-version/#devtestingandstablereleases)

Default value: '5'
Type: string

##### Example using CloudChannel
```
<Editor
  CloudChannel="5-dev"
/>
```

#### LicenseKey

Specifies the [license key](https://www.tiny.cloud/docs/tinymce/7/license-key/) to be used with TinyMCE. This option does not need to be specified if you are using TinyMCE cloud.

##### Example using LicenseKey
```
<Editor
  LicenseKey="your-license-key"
/>
```

#### Id

Specified an Id for the editor. Used for retrieving the editor instance using the `tinymce.get('ID')` method.

Default value: Automatically generated UUID
Type: string

##### Example using Id
```
<Editor
  Id="my-unique-identifier"
/>
```

#### Inline

Set the editor to inline mode.

Default value: false
Type: bool

##### Example using Inline
```
<Editor
  Inline=true
/>
```

#### Disable

Set the editor to readonly mode.

Default value: false
Type: bool

##### Example using Disable
```
<Editor
  Disable=@disable
/>
<button @onclick="@(() => disable = !disable)">Toggle</button>
```

#### JsConfSrc

Use a JS object as base configuration for the editor by specifying the path to the object relative to the window object.

Default: null
Type: string

##### Example using JsConfSrc

In your `_Host.cshtml`:
```
window.sample = {
  height: 300,
  toolbar: 'undo redo | bold italic'
}
```
In your component:
```
<Editor
  JsConfSrc="sample"
/>
```

#### Conf

Specify a set of properties for the `Tinymce.init` method to initialize the editor.

Default value: null
Type: Dictionary<string, object>

##### Example using Conf
```
<Editor
  Conf="@editorConf"
/>

@code {
  private Dictionary<string. object> editorConf = new Dictionary<string, object>{
    {"toolbar", "undo redo | bold italic"},
    {"width", 400}
  };
}
```

#### ClassName

Specify the class for the Editor container `div` in the component. This `div` is the parent of the Editor and adding styles to it will not add styles to the editor.

##### Example using ClassName

```
<Editor ClassName="my-editor-container" />

<Editor ClassName="@((isEditorActive) ? "active-editor-div" : "default-editor-div")" />
```

### Component binding

#### Input binding

The `@bind-Value` directive can be used to create a two-way data binding.

##### Example using input binding

```
<Editor
  @bind-Value=content
/>

<textarea @bind=content @bind:event="oninput"></textarea>

@code {
  private string content = "<p>Hello world</p>";
}
```

##### Enable Form Validation

When the Editor is used part of a form inside an `EditForm`, specifying `Field` directive will enable form validation behaviours like Blazor's build in form components.

By default the Editor trigger validation when `onchange` event fires. You can change the trigger to `oninput` by specifying `ValidateOnInput` to `true`.


```razor
<EditForm EditContext="@CurrentEditContext">
    <DataAnnotationsValidator />
    <p>
        <label>Content</label>

        <Editor Field="() => Model.Content"
          @bind-Value="Model.Content"
          ValidationOnInput="@true"/>

        <ValidationMessage For="() => Model.Content" />
    </p>
</EditForm>

@code {
    private Model Model { get; set; } = new Model();
    private EditContext? CurrentEditContext;

    protected override void OnInitialized()
    {
        CurrentEditContext = new(Model);
        base.OnInitialized();
    }
}
```

#### Binding Text output

Starting from v0.0.4 you can use the `@bind-Text` property to hook the text output of the editor into a variable
