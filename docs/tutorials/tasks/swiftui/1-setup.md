---
title: '1 - Setup'
---

The following guide will show you how to build a Task list application with [Android Jetpack Compose](https://developer.android.com/jetpack/getting-started). The Jetpack Compose is a modern set of libraries to build Android apps with a declarative UI with Kotlin code and without writing any XML. 

Before getting started, you will need the latest version of [Xcode](https://apps.apple.com/us/app/xcode/id497799835). This tutorial was written with Xcode 12.5.1. In addition, you should have a decent familiarity with Swift.

## 1-1 Create the App

Once you've installed the latest version of Xcode installed, Click __File > New Project__ and select `App`

![](./xcode-app-type-selection.png)

Fill out the information on the form similar to the screenshot below. These are recommended values however they are not crucial to complete this tutorial:

* Name: `"Tasks"`
* Organization Identifier: `"live.ditto"`. However, feel free to use your own value here.
* Interface: SwiftUI
* Life Cycle: "UIKit App Delegate"
* Language: Swift

And finally click "Next" and select a directory to create the application.

![](./xcode-project-form-fill.png)

## 1-2 Add dependencies (Cocoapods)

Currently, Ditto is published on [Cocoapods](https://guides.cocoapods.org/using/getting-started.html). However, we are working on Swift Package Manager support soon. 

If you have not installed Cocoapods, open up a terminal and run:

```terminal
$ sudo gem install cocoapods
```

Once Cocoapods is install, `cd` into the directory where Xcode created the __Tasks.xcproj__ and run:

```terminal
pod init
```

This will have created a __Podfile__ next to your __Tasks.xcproj__

Open up the `Podfile` your favorite code editor and replace everything with:

```ruby title="Podfile"
platform :ios, '14.0'

target 'Tasks' do
  use_frameworks!

  # Pods for Tasks
  pod 'DittoSwift', '>=1.0.8'

end
```
Save the file. In your terminal run:

```terminal
pod install --repo-update
```

Now Cocoapods should have generated a __Tasks.xcworkspace__ file and a __Pods/__ directory. 

Your file structure should now look like:

```terminal title="Directory Structure" {6}
Podfile
Podfile.lock
Pods
Tasks
Tasks.xcproj
Tasks.xcworkspace 
``` 

Now open __Tasks.xcworkspace__. 

> From now on open up Tasks.xcworkspace and _not_ Tasks.xcproj or else you will not be able to compile references to Ditto