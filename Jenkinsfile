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
    bat 'cd TinyMCE.Blazor'
    bat 'dotnet build'
  }

  stage("Testing") {
    echo "Please add tests..."
  }

  stage("Push to nuget") {
    echo "Publishing to nuget"
    withCredentials([string(credentialsId: 'NugetApi', variable: 'TOKEN')]) {
      bat 'dir bin/Debug/'
      // bat 'dotnet nuget push bin/Debug/*.nupkg --api-key %TOKEN% --source https://api.nuget.org/v3/index.json'
    }
  }
}