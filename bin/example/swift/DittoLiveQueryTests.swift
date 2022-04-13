//
//  Copyright © 2019 DittoLive Incorporated. All rights reserved.
//

import XCTest
@testable import DittoSwift

class DittoLiveQueryTests: XCTestCase {

    func testInitialResults() {
        let initialResultsExpectation = expectation(description: "Initial results event received")

        let ditto = getDitto()
        let store = ditto.store
        let collection = store.collection(UUID().uuidString)

        // Insert a document that will match the query
        let _ = try! collection.insert(["make": "Honda", "color": "red"])

        // Insert a document that will not match the query
        let _ = try! collection.insert(["make": "Honda", "color": "crimson"])

        var liveQueryCallbackCount = 0
        let liveQuery = collection.find("color == 'red'").observe { docs, event in
            liveQueryCallbackCount += 1

            switch event {
            case .initial:
                XCTAssertEqual(liveQueryCallbackCount, 1)
                XCTAssertEqual(docs.count, 1)
                AssertEqualIgnoringID(docs.first!, content: ["make": "Honda", "color": "red"])
                initialResultsExpectation.fulfill()
            case .update(_):
                XCTFail("Unexpected update event received")
            }
        }

        wait(for: [initialResultsExpectation], timeout: 2)
        liveQuery.stop()
        XCTAssertNotNil(ditto)
    }


    func testUpdate() {
        let updateExpectation = expectation(description: "Update event received")

        let ditto = getDitto()
        let store = ditto.store
        let collection = store.collection(UUID().uuidString)

        // Insert a document that will match the query
        //@ditto/snippet-start insert
        let docID = try! collection.insert(["make": "Honda", "color": "red"])
        //@ditto/snippet-end

        var liveQueryCallbackCount = 0
        //@ditto/snippet-start find
        let liveQuery = collection.find("color == 'red'").observe { docs, event in
            liveQueryCallbackCount += 1
        //@ditto/snippet-end

            switch event {
            case .initial:
                XCTAssertEqual(liveQueryCallbackCount, 1)
                XCTAssertEqual(docs.count, 1)
                AssertEqualIgnoringID(docs.first!, content: ["make": "Honda", "color": "red"])

                collection.findByID(docID).update { doc in
                    doc!["make"].set("Ferrari")
                }
            case .update(let u):
                XCTAssertEqual(liveQueryCallbackCount, 2)
                XCTAssertEqual(docs.count, 1)
                XCTAssertEqual(u.oldDocuments.count, 1)
                XCTAssertEqual(u.updates, [0])
                AssertEqualIgnoringID(docs.first!, content: ["make": "Ferrari", "color": "red"])
                updateExpectation.fulfill()
            }
        }

        wait(for: [updateExpectation], timeout: 2)
        liveQuery.stop()
        XCTAssertNotNil(ditto)
    }

    func testInsertWhenQueryingUsingArgs() {
        let insertExpectation = expectation(description: "Insert event received")

        let ditto = getDitto()
        let store = ditto.store
        let collection = store.collection(UUID().uuidString)

        var liveQueryCallbackCount = 0

        let liveQuery = collection.find("color == $args.color", args: ["color": "red"]).observe { docs, event in
            liveQueryCallbackCount += 1

            switch event {
            case .initial:
                XCTAssertEqual(liveQueryCallbackCount, 1)
                XCTAssertEqual(docs.count, 0)

                // Insert a document that will match the query
                let _ = try! collection.insert(["make": "Honda", "color": "red"])
            case .update(let u):
                XCTAssertEqual(liveQueryCallbackCount, 2)
                XCTAssertEqual(docs.count, 1)
                XCTAssertEqual(u.oldDocuments.count, 0)
                XCTAssertEqual(u.insertions, [0])
                AssertEqualIgnoringID(docs.first!, content: ["make": "Honda", "color": "red"])
                insertExpectation.fulfill()
            }
        }

        wait(for: [insertExpectation], timeout: 2)
        liveQuery.stop()
        XCTAssertNotNil(ditto)
    }
}
