var {init, Ditto, MutableDocument }= require('@dittolive/ditto')

let appID = '7e150506-58b2-4332-b293-4e5d9f802c8b';

(async () => {
    await init()

    const identity = { type: 'onlinePlayground', appID}
    const ditto1 = new Ditto(identity, './ditto1')
    ditto1.startSync()

    const ditto2 = new Ditto(identity, './ditto2')
    ditto2.startSync()
    ditto2.store.collection('people').findAll().observe(async () => {
        console.log(await people2.findByID(id))
    })

    let people1 = ditto1.store.collection('people')
    let people2 = ditto2.store.collection('people')
    let id = await people1.upsert({
        name: 'rae',
        friends: ['dave', 'chelsea', 'cam']
    })

    await people2.upsert({
        _id: id,
        name: 'rae',
        friends: ['dave', 'chelsea', 'cam']
    })
    console.log(await people1.findByID(id))
})()