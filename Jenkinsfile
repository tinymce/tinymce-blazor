#!groovy
@Library('waluigi@release/7') _

standardProperties()

tinyPods.custom([
  [ name: 'dotnet', image: 'mcr.microsoft.com/dotnet/sdk:8.0' ]
]) {
  container('dotnet') {
    stage("build") {
      echo "Building Blazor component and demo app"
      exec('dotnet build')
    }

    stage("test") {
      echo "Please add tests..."
    }

    if (isReleaseBranch()) {
      stage("publish") {
        withCredentials([string(credentialsId: 'NugetApi', variable: 'NUGET_API_KEY')]) {
          exec("dotnet nuget push \"TinyMCE.Blazor/bin/Debug/*.nupkg\" --api-key ${env.NUGET_API_KEY} --source https://api.nuget.org/v3/index.json --skip-duplicate")
        }
      }
    }
  }
}
