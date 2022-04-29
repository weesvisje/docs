var {init, Ditto }= require('@dittolive/ditto')

let appID = '7e150506-58b2-4332-b293-4e5d9f802c8b';

(async () => {
    await init()

    const identity = { type: 'onlinePlayground', appID}
    const ditto = new Ditto(identity, './ditto1')
    ditto.startSync()

    let people = ditto.store.collection('people')
    let id = await people.upsert({
        name: 'rae',
        friends: ['dave', 'chelsea', 'cam'],
        drinks: 10,
        seat: '16c' 
    })

    await people.findByID(id).update((doc) => {
        doc._replaceWithCounterAt('drinks')
        doc._incrementCounterAt('drinks', 1)
    })

    console.log(await people.findByID(id))

    await people.upsert({
        _id: id,
        drinks: 10,
        seat: '16c' 
    })
    console.log(await people.findByID(id))

    await people.findByID(id).update((doc) => {
        doc._replaceWithCounterAt('drinks')
    })

    console.log(await people.findByID(id))
})()