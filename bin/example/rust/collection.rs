#[macro_use]
extern crate serde_json;

mod common;

use common::*;

#[test]
fn empty_name_is_err() {
    let dk = common::get_ditto().unwrap();
    let store = dk.store();
    let coll = store.collection("");
    // Without an explicit call to drop,
    // ditto will get dropped before the
    // tempdir, resulting in an error
    assert!(coll.is_err());
}

#[test]
fn whitespace_name_is_err() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("   ");
    assert!(collection.is_err());
}

#[test]
fn simple_insert() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let content = json!({"hello": "again"});
    let collection = store.collection("test").unwrap();
    let id = collection.insert(content, None, false).unwrap();
    let doc = collection.find_by_id(id.to_owned()).exec().unwrap();
    assert_eq!(id, doc.id());
    assert_eq!(doc.get::<String>("hello").unwrap(), "again");
}

#[test]
fn insert_overwrites_existing_content_by_default() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"custom_id".to_string()).unwrap();
    let id1 = collection
        .insert(json!({"some": "value"}), Some(&custom_id), false)
        .unwrap();
    let id2 = collection
        .insert(json!({"another": "thing"}), Some(&custom_id), false)
        .unwrap();
    let doc = collection.find_by_id(custom_id).exec().unwrap();
    assert_eq!(id1, doc.id());
    assert_eq!(id2, doc.id());
    assert_eq!(doc.get::<String>("another").unwrap(), "thing");
    // Expect key-value pair under "some" key to not exist in document after
    // being overwritten, which leads to an error result in the `get` call.
    assert!(doc.get::<String>("some").is_err());
}

#[test]
fn insert_merges_with_existing_content_if_specified_in_options() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"custom_id".to_string()).unwrap();
    //@ditto/snippet-start insert
    let id1 = collection
        .insert(json!({"some": "value"}), Some(&custom_id), false)
        .unwrap();
    //@ditto/snippet-end 
    let id2 = collection
        .insert_with_strategy(
            json!({"another": "thing"}),
            Some(&custom_id),
            WriteStrategy::Merge,
        )
        .unwrap();
    let doc = collection.find_by_id(custom_id).exec().unwrap();
    assert_eq!(id1, doc.id());
    assert_eq!(id2, doc.id());
    assert_eq!(doc.get::<String>("another").unwrap(), "thing");
    assert_eq!(doc.get::<String>("some").unwrap(), "value");
}

#[test]
fn inserting_default_data_if_a_document_with_a_matching_id_already_exists_is_a_no_op() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"custom_id".to_string()).unwrap();

    let id1 = collection
        .insert(json!({"some": "value"}), Some(&custom_id), true)
        .unwrap();

    // Immediately try and insert some new default data using both supported
    // methods
    let id2 = collection
        .insert(json!({"different": "default data"}), Some(&custom_id), true)
        .unwrap();
    let id2b = collection
        .insert_with_strategy(
            json!({"other different": "default data"}),
            Some(&custom_id),
            WriteStrategy::InsertDefaultIfAbsent,
        )
        .unwrap();

    // The new default data has been ignored because a document with a matching
    // ID already existed
    let doc = collection.find_by_id(custom_id.clone()).exec().unwrap();
    assert_eq!(doc.get::<String>("some").unwrap(), "value");
    assert!(doc.get::<String>("different").is_err());

    // Perform an insert of a document containing *non* default data
    let id3 = collection
        .insert_with_strategy(json!({"a": "b"}), Some(&custom_id), WriteStrategy::Merge)
        .unwrap();

    // Again try and insert some new default data using both supported methods
    let id4 = collection
        .insert(json!({"different": "default data"}), Some(&custom_id), true)
        .unwrap();
    let id4b = collection
        .insert_with_strategy(
            json!({"other different": "default data"}),
            Some(&custom_id),
            WriteStrategy::InsertDefaultIfAbsent,
        )
        .unwrap();

    let doc = collection.find_by_id(custom_id).exec().unwrap();
    assert_eq!(doc.get::<String>("a").unwrap(), "b");
    assert_eq!(doc.get::<String>("some").unwrap(), "value");
    assert!(doc.get::<String>("different").is_err());
    assert_eq!(id1, doc.id());
    assert_eq!(id2, doc.id());
    assert_eq!(id2b, doc.id());
    assert_eq!(id3, doc.id());
    assert_eq!(id4, doc.id());
    assert_eq!(id4b, doc.id());
}

#[test]
fn inserts_a_document_if_no_preexisting_when_using_appropriate_strategy() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"custom_id".to_string()).unwrap();
    let id1 = collection
        .insert(json!({"some": "value"}), Some(&custom_id), false)
        .unwrap();
    let id2 = collection
        .insert_with_strategy(
            json!({"another": "thing"}),
            Some(&custom_id),
            WriteStrategy::InsertIfAbsent,
        )
        .unwrap();
    let doc = collection.find_by_id(custom_id).exec().unwrap();
    assert_eq!(id1, doc.id());
    assert_eq!(id2, doc.id());
    assert_eq!(doc.get::<String>("some").unwrap(), "value");
    assert!(doc.get::<String>("another").is_err());
}

#[test]
fn find_with_args() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    collection
        .insert(json!({"make": "Honda", "color": "red"}), None, false)
        .unwrap();
    collection
        .insert(json!({"make": "Ford", "color": "blue"}), None, false)
        .unwrap();
    collection
        .insert(json!({"make": "Ferrari", "color": "red"}), None, false)
        .unwrap();
    let sort_param = ffi_sdk::COrderByParam {
        query_c_str: c!("make"),
        direction: ffi_sdk::QuerySortDirection::Descending,
    };
    let docs = collection
        .find_with_args("color == $args.color", json!({"color": "red"}))
        .sort(vec![sort_param])
        .exec()
        .unwrap();
    assert_eq!(docs.len(), 2);
    assert_eq!(docs[0].get::<String>("make").unwrap(), "Honda");
    assert_eq!(docs[1].get::<String>("make").unwrap(), "Ferrari");
}

#[test]
fn insert_with_provided_id() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let content = json!({"hello": "again"});
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"a".to_string()).unwrap();
    let id = collection.insert(content, Some(&custom_id), false).unwrap();
    let doc = collection.find_by_id(custom_id.to_owned()).exec().unwrap();
    assert_eq!(id, custom_id);
    assert_eq!(id, doc.id());
    assert_eq!(doc.get::<String>("hello").unwrap(), "again");
}

#[test]
fn insert_with_id_in_document_content() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let content = json!({"_id": DocumentId::new(&"abc".to_string()).unwrap(), "some": "value"});
    let id = collection.insert(content, None, false).unwrap();
    let expected_id = DocumentId::new(&"abc".to_string()).unwrap();
    assert_eq!(id, expected_id);
    let doc = collection
        .find_by_id(expected_id.to_owned())
        .exec()
        .unwrap();
    assert_eq!(expected_id, doc.id());
    assert_eq!(doc.get::<String>("_id").unwrap(), expected_id.to_string());
}

#[test]
fn get_id_subvalue_from_document_content() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id =
        DocumentId::new(&json!({ "nested": { "should": { "work": [123, 456] } } })).unwrap();
    let id = collection
        .insert(json!({"a": "1"}), Some(&custom_id), false)
        .unwrap();
    assert_eq!(id, custom_id);
    let doc = collection.find_by_id(custom_id.to_owned()).exec().unwrap();
    assert_eq!(custom_id, doc.id());
    assert_eq!(doc.get::<u16>("_id.nested.should.work[1]").unwrap(), 456);
}

#[test]
fn insert_with_provided_id_and_id_in_document_content() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"def".to_string()).unwrap();
    let content = json!({"_id": DocumentId::new(&"abc".to_string()).unwrap(), "some": "value"});
    let id = collection.insert(content, Some(&custom_id), false).unwrap();
    assert_eq!(id, custom_id);
    let doc = collection.find_by_id(custom_id.to_owned()).exec().unwrap();
    assert_eq!(custom_id, doc.id());
    assert_eq!(doc.get::<String>("_id").unwrap(), custom_id.to_string());
}

#[test]
fn roundtrip_with_document_ids_of_different_types() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();

    let raw_doc_ids: Vec<serde_json::Value> = vec![
        "boring_old_string".to_string().into(),
        1.into(),
        0.into(),
        123.into(),
        9999.into(),
        false.into(),
        true.into(),
        (0..64)
            .map(|_| rand::random::<u8>())
            .collect::<Vec<u8>>()
            .into(),
        vec!["a", "abc", "z89{{}}@£!fv>?!,[](){{}}000"].into(),
        json!({"a": "b", "__num__@£$%^&{})(|,,./!?": -7123}),
    ];

    raw_doc_ids.iter().for_each(|raw_id| {
        let doc_id = DocumentId::new(raw_id).unwrap();
        let returned_id = collection
            .insert(json!({"hello": "again"}), Some(&doc_id), false)
            .unwrap();
        assert_eq!(doc_id, returned_id);

        let doc = collection.find_by_id(doc_id.clone()).exec().unwrap();
        assert_eq!(doc.id(), doc_id);
    });
}

#[test]
fn trying_to_update_document_id_via_id_key_fails() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let content = json!({"hello": "again"});
    let collection = store.collection("test").unwrap();
    let id = collection.insert(content, None, false).unwrap();

    let update_res = collection.find_by_id(id.to_owned()).update(|mut_doc| {
        if let Some(doc) = mut_doc {
            let set_res = doc.set(
                "_id",
                DocumentId::new(&"sneaky_new_id".to_string()).unwrap(),
            );
            assert!(set_res.unwrap_err().to_string().contains(
                "Attempting to update the `_id` key is an error. You cannot update a document's \
                 ID."
            ));

            let remove_res = doc.remove("_id");
            assert!(remove_res.unwrap_err().to_string().contains(
                "Attempting to remove the `_id` key is an error. You cannot remove a document's \
                 ID."
            ));

            let counter_res = doc.replace_with_counter("_id", false);
            assert!(counter_res.unwrap_err().to_string().contains(
                "Attempting to replace the `_id` key with a counter is an error. You cannot \
                 update a document's ID."
            ));

            let increment_res = doc.increment("_id", 0.3);
            assert!(increment_res.unwrap_err().to_string().contains(
                "Attempting to increment the `_id` key is an error. You cannot update a \
                 document's ID."
            ));

            let push_res = doc.push("_id", "something");
            assert!(push_res.unwrap_err().to_string().contains(
                "Attempting to push on to the `_id` key is an error. You cannot update a \
                 document's ID."
            ));

            let pop_res: Result<String, _> = doc.pop("_id");
            assert!(pop_res.unwrap_err().to_string().contains(
                "Attempting to pop the `_id` key is an error. You cannot update a document's ID."
            ));

            let insert_res = doc.insert("_id", -7123);
            assert!(insert_res.unwrap_err().to_string().contains(
                "Attempting to insert the `_id` key is an error. You cannot update a document's \
                 ID."
            ));
        }
    });

    assert_eq!(update_res.unwrap().len(), 0);

    let doc = collection.find_by_id(id.to_owned()).exec().unwrap();
    assert_eq!(id, doc.id());
}

/// Test round trip insertion and deserialization correctly preserves fields
/// of various types
#[test]
fn serialize_insert_roundtrip() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let content = TestType::random();
    let collection = store.collection("test").unwrap();
    let custom_id = DocumentId::new(&"a".to_string()).unwrap();
    let id = collection
        .insert(content.to_owned(), Some(&custom_id), false)
        .unwrap();
    let doc = collection.find_by_id(id).exec().unwrap();
    let returned_content = doc.typed::<TestType>().unwrap();
    assert_eq!(content, returned_content);
}

#[test]
fn inserting_invalid_doc_throws_error() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let content = json!(["hello", "again"]);
    let collection = store.collection("test").unwrap();
    let result = collection.insert(content, None, false);
    assert!(result.is_err());
}

#[test]
fn simple_update() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    // this collection needs to be namespaced?
    let collection = store.collection("test").unwrap();
    let content = TestType::random();

    let id = collection.insert(content, None, false).unwrap();

    collection
        .find_by_id(id.to_owned())
        .update(|x| {
            if let Some(doc) = x {
                let _ = doc.set("something", "NewValue").unwrap();
            }
        })
        .unwrap();

    let updated = collection.find_by_id(id).exec().unwrap();

    let new_val = updated.get::<String>("something").unwrap();

    assert_eq!(new_val, "NewValue");
}

#[test]
fn list_collection() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let uuid = uuid::Uuid::new_v4().to_string();
    let collection = store.collection(&uuid).unwrap();

    // The insert order is no longer preserved
    let _id_a = collection
        .insert(json!({"a": "valForA", "rank": 1}), None, false)
        .unwrap();
    let _id_b = collection
        .insert(json!({"b": "valForB", "rank": 2}), None, false)
        .unwrap();
    let _id_c = collection
        .insert(json!({"c": "valForC", "rank": 3}), None, false)
        .unwrap();

    let sort_param = ffi_sdk::COrderByParam {
        query_c_str: c!("rank"),
        direction: ffi_sdk::QuerySortDirection::Ascending,
    };
    let docs = collection.find_all().sort(vec![sort_param]).exec().unwrap();
    assert_eq!(docs.len(), 3);
    assert_eq!(docs[2].get::<String>("c").unwrap(), "valForC");
}

#[test]
fn document_id() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();

    let cbor_doc_id = ::serde_cbor::value::to_value(::serde_json::json!({
        "a": {
            "_b_": [
                123,
                "z",
                {
                    "c..": 42,
                },
            ],
        },
    }))
    .unwrap();

    let doc_id = DocumentId::new(&cbor_doc_id).unwrap();
    let returned_id = collection
        .insert(json!({"hello": "again"}), Some(&doc_id), false)
        .unwrap();
    assert_eq!(doc_id, returned_id);

    let doc = collection.find_by_id(doc_id.clone()).exec().unwrap();
    assert_eq!(doc.id(), doc_id);

    assert_eq!(doc.id().value(), cbor_doc_id);
}

#[test]
fn evict_remove_and_update_with_args() {
    let ditto = common::get_ditto().unwrap();
    let store = ditto.store();
    let collection = store.collection("test").unwrap();
    let honda_id = collection
        .insert(json!({"make": "Honda", "color": "red"}), None, false)
        .unwrap();
    let ford_id = collection
        .insert(json!({"make": "Ford", "color": "blue"}), None, false)
        .unwrap();
    let ferrari_id = collection
        .insert(json!({"make": "Ferrari", "color": "red"}), None, false)
        .unwrap();
    let lamborghini_id = collection
        .insert(
            json!({"make": "Lamborghini", "color": "yellow"}),
            None,
            false,
        )
        .unwrap();

    let docs = collection
        .find_with_args(
            "contains([$args.color1, $args.color2], color)",
            json!({"color1": "red", "color2": "yellow"}),
        )
        .exec()
        .unwrap();
    assert_eq!(docs.len(), 3);

    let removed_ids = collection
        .find_with_args("color == $args.color", json!({"color": "yellow"}))
        .remove()
        .unwrap();
    assert_eq!(removed_ids.len(), 1);
    assert_eq!(removed_ids[0], lamborghini_id);

    let sort_param = ffi_sdk::COrderByParam {
        query_c_str: c!("make"),
        direction: ffi_sdk::QuerySortDirection::Descending,
    };
    let evicted_ids = collection
        .find_with_args("$args.color == color", json!({"color": "red"}))
        .sort(vec![sort_param])
        .evict()
        .unwrap();
    assert_eq!(evicted_ids.len(), 2);
    assert_eq!(evicted_ids[0], honda_id);
    assert_eq!(evicted_ids[1], ferrari_id);

    let docs = collection
        .find_with_args(
            "contains([$args.color1, $args.color2], color)",
            json!({"color1": "red", "color2": "yellow"}),
        )
        .exec()
        .unwrap();
    assert_eq!(docs.len(), 0);

    let _ = collection
        .find_with_args("color == $args.color", json!({"color": "blue"}))
        .update(|mut_docs| {
            assert_eq!(mut_docs.len(), 1);
            mut_docs[0].set("color", "purple").unwrap();
        });

    let docs = collection
        .find_with_args(
            "color != $args.color1 && color != $args.color2",
            json!({"color1": "red", "color2": "yellow"}),
        )
        .exec()
        .unwrap();
    assert_eq!(docs.len(), 1);
    assert_eq!(docs[0].id(), ford_id);
    assert_eq!(docs[0].get::<String>("color").unwrap(), "purple");
}
