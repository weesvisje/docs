# Authentication Server

You can configure the C# SDK itself as a Ditto-standard authentication service.
The server looks at the incoming credentials to decide whether to let a peer
syncronize with the server or not. You provide all of the signing and verifying
keys yourself through the SDK, thereby making the resulting JWTs ([JSON Web
Tokens](https://jwt.io/)) properly authenticate with Ditto. 

Now the web browser peer has a way to log in and sync with Ditto, in
`OnlineWithAuthentication` mode, while other devices are in SharedKey mode.

In this arrangement, the C# server peer chooses the read and write permissions
that each authenticating peer will receive. After login, if you proceed to sync
using the WebSocket transport, be aware that there is no permission control in
the reverse direction: the server peer is always granted read/write access to
all documents.



### Keys

First, you need to create three keys:

* a signing key in PEM format:

```
openssl ecparam -name prime256v1 -genkey -text | openssl pkcs8 -topk8 -nocrypt -out priv.key
```

* a verifiying key in PEM format:

```
openssl ec -in priv.key -pubout -out pub.key
```

* a [shared key](../common/security/shared-key)

### Code samples

We have two small peer Ditto instances running locally:
        
* One configured as an HTTP listener and identity provider
* One configured as a WebSocket client.

#### Server code

The server and their other devices can use SharedKey identity while a web
browser can connect to this C# peer over LAN and sync. 

```cs
string appId = "YOUR_APP_ID_HERE";
string verifyingKey = @"-----BEGIN PUBLIC KEY-----
....
-----END PUBLIC KEY-----
";

string signingKey = @"-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----";

string sharedKey = "...";

var serverIdentity = DittoIdentity.SharedKey(
    appId,
    sharedKey
);
var serverDitto = new Ditto(serverIdentity, serverPersistence.Path);
serverDitto.DeviceName = "TestServer";
serverDitto.SetOfflineOnlyLicenseToken(TestLicense);

// Server is an HTTP/WebSocket server only
var serverConfig = new DittoTransportConfig();
serverConfig.Listen.Http.Enabled = true;
serverConfig.Listen.Http.InterfaceIp = "127.0.0.1";
serverConfig.Listen.Http.Port = 45001;
serverConfig.Listen.Http.WebsocketSync = true;
serverConfig.Listen.Http.IdentityProvider = true;
serverConfig.Listen.Http.IdentityProviderSigningKey = signingKey;
serverConfig.Listen.Http.IdentityProviderVerifyingKeys.Add(verifyingKey);
serverDitto.SetTransportConfig(serverConfig);
serverDitto.TryStartSync();

// Handle any incoming authentication requests
serverDitto.DittoIdentityProviderAuthenticationRequest += (sender, args) =>
{
    if (args.AppId == appId && args.ThirdPartyToken == "jellybean")
    {
        var success = new DittoAuthenticationSuccess();
        success.AccessExpires = DateTime.Now + new TimeSpan(1, 0, 0);
        success.UserId = "bob";
        success.ReadEverythingPermission = true;
        success.WriteEverythingPermission = true;
        args.Allow(success);
    }
    else
    {
        args.Deny();
    }
};
```

#### Client code 

Integrate this into your web application. Because it's a web browser, only the
WebSocket transport is available.


```js

const authHandler = {
    authenticationRequired: async function(authenticator) {
      console.log("Login request.");
      await authenticator.loginWithToken("jellybeans", "provider");
    },
    authenticationExpiringSoon: function(authenticator, secondsRemaining) {
      console.log(`Auth token expiring in ${secondsRemaining} seconds`)
    }
}

const identity = { 
    type: 'onlineWithAuthentication', 
    appID: "c210fe14-1234-4538-94b3-a28e10e55ade", 
    authHandler: authHandler, 
    enableDittoCloudSync: false, 
    customAuthURL: "http://192.168.0.164:8080" 
}

const ditto = new Ditto(identity, 'ditto')

const config = new TransportConfig()
config.connect.websocketURLs.push('ws://192.168.0.164:8080')
ditto.setTransportConfig(config)
ditto.tryStartSync()
```
