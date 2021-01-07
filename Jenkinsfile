#!groovy
@Library('waluigi@v3.2.0') _

standardProperties()

node("bedrock-windows-10") {
  echo "Clean workspace"
  cleanWs()

  stage ("Checkout SCM") {
    checkout localBranch(scm)
  }

  stage("Building") {
    echo "Building Blazor component"
    bat 'dotnet build TinyMCE.Blazor'
  }

  stage("Testing") {
    echo "Please add tests..."
  }

  if (isReleaseBranch()) {
    stage("Publish") {
      withCredentials([string(credentialsId: 'NugetApi', variable: 'TOKEN')]) {
        bat 'dotnet nuget push "TinyMCE.Blazor\\bin\\Debug\\*.nupkg" --api-key %TOKEN% --source https://api.nuget.org/v3/index.json --skip-duplicate'
      }
    }
  }
}