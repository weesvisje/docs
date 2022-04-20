var {init, Ditto, MutableDocument }= require('@dittolive/ditto')

let appID = '7e150506-58b2-4332-b293-4e5d9f802c8b';

(async () => {
    await init()

    const identity = { type: 'onlinePlayground', appID}
    const ditto = new Ditto(identity, './ditto')
    ditto.startSync()


    let people = ditto.store.collection('people')
    let id = await people.upsert({
        name: 'rae',
        friends: ['dave', 'chelsea', 'cam']
    })

    await people.findByID(id).update((doc) => {
        let friends = MutableDocument.pathAt(doc, 'friends')
        friends.insert('john')
    })

    console.log(await people.findByID(id))
})()