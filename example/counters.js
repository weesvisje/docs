var {init, Ditto }= require('@dittolive/ditto')

let appID = '7e150506-58b2-4332-b293-4e5d9f802c8b';

(async () => {
    await init()

    const identity = { type: 'onlinePlayground', appID}
    const ditto1 = new Ditto(identity, './ditto1')
    ditto.startSync()

    const ditto2 = new Ditto(identity, './ditto2')
    ditto.startSync()


    let id = await ditto1.store.collection('people').upsert({
        name: 'rae',
        friends: ['dave', 'chelsea', 'cam'],
        drinks: 0,
        seat: '16c' 
    })

    await ditto1.store.collection('people').findByID(id).update((doc) => {
        doc._replaceWithCounterAt('drinks')
        doc._incrementCounterAt('drinks', 1)
        doc.friends.push('john')
    })

    await ditto2.store.collection('people').findByID(id).update((doc) => {
        doc._replaceWithCounterAt('drinks')
        doc._incrementCounterAt('drinks', 1)
        doc.friends.push('john')
    })

    console.log(await people.findByID(id))
})()