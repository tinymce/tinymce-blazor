# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 2.1.0 - 2025-04-30

### Added
- New `Readonly` property that can be used to toggle the `readonly` mode.

### Changed
- The `Disabled` property now toggles the `disabled` option state instead of toggling the `readonly` mode.

## 2.0.0 - 2024-10-31

### Added
- New `LicenseKey` property to be used with self hosted TinyMCE.

### Changed
- Default cloud channel to '7'.
- Dropped support for .NET 5 and 6 in favor of 8 since they are out of service more details can be found at https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core

### Fixed
- Custom ClassName would not be used if the component was not rendered inside an EditForm. Patch contributed by Kamil Kuklinski.

## 1.0.4 - 2022-05-20

### Fixed
- Disposing of dot net reference calls
- `InsertContent` correct function call

## 1.0.3 - 2022-04-27

### Changed
- Chunking size limit value

## 1.0.2 - 2022-04-08

### Added
- `InsertContent` API to insert content at caret position

### Fixed
- Default cloud channel back to '6'
- Editor not cleaning up pop-up after disposing

## 1.0.1 - 2022-03-23

### Fixed
- Default cloud channel reverted to '5' until the release of '6'

## 1.0.0 - 2022-03-08

### Changed
- License: Code provided under MIT license
- Default cloud channel to '6'

## 0.0.9 - 2021-12-04

### Added
- Support for EditContext

## 0.0.8 - 2021-10-13

### Added
- ClassName parameter for outside container

## 0.0.7 - 2021-08-26

### Added
- Disable property

## 0.0.6 - 2021-05-18

### Changed
- Remove event listeners when disposing

## 0.0.5 - 2021-05-12

### Changed
- Setup callback to execute after initial setup

## 0.0.4 - 2021-05-07

### Added
- Support for text output
- IDisposable implementation

### Changed
- Typo triggering multiple script downloads
- Fix reference when reseting to null

## 0.0.3 - 2021-01-11

### Changed
* Update package metadata

## 0.0.2 - 2021-01-07

### Changed
* Update package metadata

## 0.0.1 - 2021-01-07

### Added
* Editor wrapper for blazor
