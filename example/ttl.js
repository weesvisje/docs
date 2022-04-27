var {init, Ditto}= require('@dittolive/ditto')

let appID = '7e150506-58b2-4332-b293-4e5d9f802c8b';

(async () => {
    await init()

    const identity = { type: 'onlinePlayground', appID}
    const ditto = new Ditto(identity, './ditto')
    ditto.startSync()


    let people = ditto.store.collection('people')
    let liveQuery = people.findAll().subscribe()
    setInterval(() => {
        let id = people.upsert({
            name: 'rae'
        })
    }, 2000)
})()