---
title: 'Prolonged Background Sync'
sidebar_position: 5
---

iOS apps will deallocate Ditto and stop syncronization when the application is
put out of focus and into the background. If you need Ditto to continue
syncronizing while the application is in the background, you need to tell iOS to keep the
app active.

To do this, we recommend playing empty music in the background which will keep the app active.

Create an instnace of `BackgroundSync` on your main controller and call
```BackgroundSync.start()``` to start playing empty music.

```swift
final public class BackgroundSync {
    public static let shared = BackgroundSync()
    private let player: AVAudioPlayer
    private let base64AudioString = "UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD8/w=="

    public var isOn = false

    private init() {
        let audioData = Data(base64Encoded: base64AudioString)!
        try! AVAudioSession.sharedInstance().setCategory(AVAudioSession.Category.playback,
                                                         mode: .default,
                                                         options: .mixWithOthers)
        try! AVAudioSession.sharedInstance().setActive(true)
        player = try! AVAudioPlayer(data: audioData, fileTypeHint: "wav")
        player.numberOfLoops = -1
        player.volume = 0.01
        player.prepareToPlay()
    }

    public func start() {
        guard isOn else { return }

        NotificationCenter.default.addObserver(self, selector: #selector(interuptedAudio), name: AVAudioSession.interruptionNotification, object: AVAudioSession.sharedInstance())
        self.player.play()
        print("BackgroundSync started")
    }

    public func stop() {
        NotificationCenter.default.removeObserver(self, name: AVAudioSession.interruptionNotification, object: nil)
        if player.isPlaying {
            player.stop()
            print("BackgroundSync stopped")
        }
    }

    @objc private func interuptedAudio(_ notification: Notification) {
        if notification.name == AVAudioSession.interruptionNotification && notification.userInfo != nil {
            let info = notification.userInfo!
            var intValue = 0
            (info[AVAudioSessionInterruptionTypeKey]! as AnyObject).getValue(&intValue)
            if intValue == 1 { self.player.play() }
        }
    }
}
```