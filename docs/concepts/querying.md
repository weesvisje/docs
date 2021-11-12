---
title: 'Querying'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ditto provides a robust query engine that supports different filter operations. At a high-level, all queries work on a specific collection and are used to filter the collection. In addition, since Ditto works with data represented in JSON-compatible documents, the query syntax offers dot notation to reference keys within the document tree as shown below:

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
const collection = await ditto.store.collection('people')
    .find("favoriteBooks[0].title == 'The Great Gatsby'")

```

</TabItem>
<TabItem value="swift">

```swift
let collection = ditto.store.collection("people")
    .find("favoriteBooks[0].title == 'The Great Gatsby'")
    .exec()

```

</TabItem>
<TabItem value="objc">

```objc
NSArray *docs = [[[ditto.store collection:@"people"]
                    find:@"favoriteBooks[0].title == 'The Great Gatsby'"] exec];

```

</TabItem>
<TabItem value="kotlin">

```kotlin
val results = ditto.store.collection("people")
    .find("favoriteBooks[0].title == 'The Great Gatsby'")
    .exec()

```

</TabItem>
<TabItem value="java">

```java
List<DittoDocument> results = ditto.store.collection("people")
    .find("favoriteBooks[0].title == 'The Great Gatsby'")
    .exec();

```

</TabItem>
<TabItem value="csharp">

```csharp
var results = ditto.Store.Collection("people")
    .Find("favoriteBooks[0].title == 'The Great Gatsby'")
    .Exec();

```

</TabItem>
<TabItem value="cpp">

```cpp
std::vector<Document> results = ditto.store.collection("people")
    .find("favoriteBooks[0].title == 'The Great Gatsby'")
    .exec();

```

</TabItem>
<TabItem value="rust">

```rust
let docs = ditto.store().collection("people")
.find("favoriteBooks[0].title == \'The Great Gatsby\'")
.exec()?;
```

</TabItem>
</Tabs>

## Navigating Document Properties

To refer to keys within the document's property tree, Ditto uses dot notation that should be familiar to most developers. Let's say we have a document like so:


```json
{
   "_id": "123abc",
   "name": { "first": "Alan", "last": "Turing" },
   "contact": { "phone": { "type": "cell", "number": "111-222-3333" } },
   "work": { "street-line": "678 Johnson Street"}
}
```

If you wanted to query for the `lastName` property nested in `name` with the following document contents

```js
find("name.last == 'Turing'")
```

Keys in the query syntax by default must be alphanumeric or include underscore (a-zA-Z0-9_). In addition, the key must start with an alpha characters first (a-zA-Z_). If your key uses another character, such as a hyphen, you must use a __brack syntax__. To query for th `"street-line"` property underneath `"work"`, you will need to do the following: 

```js
find("work['street-line'] == '678 Johnson Street'")
```

## Using query variables with `$args` 

Often, you will query with runtime variables. Instead of building or interpolating query strings, the query system will accept variables through an `$args` dictionary object. 

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
const documents = await ditto.store.collection('users').find("name == $args.name && age <= $args.age", {
  age: 32,
  name: "Max"
})
```

</TabItem>
<TabItem value="swift">

```swift
let documents = ditto.store["users"].find("name == $args.name && age <= $args.age", [
  "age": 32,
  "name": "Max"
]).exec()
```

</TabItem>
<TabItem value="objc">

```objc
let documents = ditto.store["users"].find("name == $args.name && age <= $args.age", [
  "age": 32,
  "name": "Max"
]).exec()
```

</TabItem>
<TabItem value="kotlin">

```kotlin
val foundDocs = ditto.store.collection("users")
    .find("name == $args.name && age <= $args.age", mapOf("name" to "max", "age" to 32))
```

</TabItem>
<TabItem value="java">

```java
Map<String, Object> queryArgs = new HashMap<>();
        queryArgs.put("name", "max");
        queryArgs.put("age", 32);

List<DittoDocument> foundDocs = ditto.store.collection("users")
        .find("name == $args.name && age <= $args.age", queryArgs)
        .exec();
```

</TabItem>
<TabItem value="csharp">

```csharp
var docs = ditto.store
  .collection("users")
  .Find(
    "name == $args.name && age <= $args.age", 
    new Dictionary<string, object> { { "name", "max"}, {"age", 32 } })
  .Exec();
```

</TabItem>
<TabItem value="cpp">

```cpp
std::vector<json> big_c_values =
      ditto.store.collection.find("name == $args.name && age <= $args.age", json({{"age", 32}, {"name", "max"}}))
          .exec();
```

</TabItem>

<TabItem value="rust">

```rust
let query_args = QueryArgs{...};
let docs = ditto.store().collection("people")?
  .find_with_args("name == $args.name && arg <= $args.age", &args)
  .exec()?;
```

</TabItem>
</Tabs>

## Query Conditions

The Ditto query language is very similar to what you'd write in most `if` statements. In addition, we offer standard, easy-to-understand query condition operators that most developers should understand.


### Equality `==`, Inequality

```js
// finds documents which have a title equal to Harry Potter.
find("title == $args.title", { title: 'Harry Potter' })

// finds documents which that are not of the title Lord of the Rings
find("title != $args.title", { title: 'Lord of the rings' })
```

### Comparisons - Greater Or Less Than `>=`, `>`, `<`, `<=`



```js
// finds documents where the age is less than or equal to 18
find("age <= $args.age", { age: 18})
// finds documents where the age is less than to 18
find("age < $args.age", { age: 18})
// finds documents where the age is greater than or equal to 18
find("age >= $args.age", { age: 18})
// finds documents where the age is greater than to 18
find("age > $args.age", { age: 18})
```

### Compound - And `&&`, Or `||`, Not `!`, Contains `contains`


Use `&&` for a logical __and__ Predicate; similar to SQLite's AND
```js
// finds documents that have a theme property equal to "Dark" and a name property equaly to "Light"
find("theme == 'Dark' && name == 'Light'")
```

Use `||` for a logical __or__ predicate; similar to SQL OR statements
```js
// finds documents that are "Tom" or "Arthur"
find("name == 'Tom' || name == 'Arthur'")
```

Use `!` for a logical __not__ predicate; similar to SQL NOT statements

```js
// finds documents that are neither "Hamilton" nor "Morten"
find("!(name == 'Hamilton' || name == 'Morten')")
```

Use `contains(array, value)` to check an if an array contains a value. 

```js
// finds documents who have a `connectionType` property and checks if it equals any of the values in a defined array
find("contains(['bluetooth', 'wifidirect'], connectionType)")
```

### Array Operations

For the following examples assume a document structure like:


```json
{
  "_id": "123abc",
  "books": [
    {
      "title": "Harry Potter",
      "authors": ["J. K. Rowling"]
    },
    {
      "title": "Lord of the Rings",
      "authors": ["J. R. R. Tolkien"]
    },
    {
      "title": "Game of Thrones",
      "authors": ["George R. R. Martin"]
    },
    {
      "title": "The Talisman",
      "authors": ["Stephen King", "Peter Straub"]
    }
  ],
  "tags": ["fantasy", "novel"],
  "scores": [12, 14]
}
```

Use `array[index]` to access a specific index of an array property. Let's say we have a document that looks like:

```js
// finds the first book property under "books" and checks for the "title" property
find("books[0].title == 'Harry Potter'")
```

Use `length(propertyPath)` to return an integer value that represents the size of the array

```js
// finds books that have at least 2 tags
find("length(tags) >= 2")
```

Use `sum(propertyPath)` to return a summation float that represents the sum of the array values

```js
// finds documents who have a sum of all their scores to be less than 10
find("sum(scores) < 10")
```

Use `array[? expression]` to return an array only containing the input array items that satisfy the expression.
  
Eg. `books[? length(authors) >= 2]` for the example document is `[{"title": "The Talisman", "authors": ["Stephen King", "Peter Straub"]}]`.

```js
// finds documents with books that have 2 or more authors
find("books[? length(authors) >= 2] != []")
```

Use `array[*].subpath` that collects the subpath of each array item in the result array.

Eg. `books[*].authors[0]` for the example document is `["J. K. Rowling", "J. R. R. Tolkien", "George R. R. Martin", "Stephen King"]`

Eg. `books[*].authors` for the example document is `[["J. K. Rowling"], ["J. R. R. Tolkien"], ["George R. R. Martin"], ["Stephen King", "Peter Straub"]]`
  
```js
// finds documents with books whose Stephen King is the first author
find("contains('Stephen King', books[*].authors[0])")
```

Use `array[]` to flatten the input array by one level. Elements of the input array that are not arrays are pushed as-is to the result array.

Eg. `(books[*].authors)[]` for the example document is `["J. K. Rowling", "J. R. R. Tolkien", "George R. R. Martin", "Stephen King", "Peter Straub"]`

```js
// finds documents with books authored or co-authored by Stephen King
find("contains('Stephen King', (books[*].authors)[])")
```

### String Operations

Use `beginsWith(property, test)` to test if a property with a string value __begins__ with a test string

```js
// finds documents with a title property that begins with "Lord"
find("beginsWith(title, 'Lord')")
```

Use `endsWith(property, test)` to test if a property with a string value __ends__ with a test string

```js
// finds documents with a title property that begins with "Lord"
find("endsWith(title, 'Rings')")
```

Use `regex(property, test)` to see if a property with a string value passes a [Regular Expression. Click here for a reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). 

```js
// finds documents which has a title property that only comprises of upper and lowercase letters, numbers, and underscores. 
find("regex(title, '^([A-Za-z]|[0-9]|_)+$')")

// A title property of "abc129_24A" will pass
// A title property of "abc129_24A  3" will not pass
```

## Sort

Before executing a query, you can specify to sort on a specific property. Call `sort` before a query is executed by specifying a specific property and a sort direction. 

Note: Queries that do not specify a `sort` will assume to sort on the `_id` property.

The following example will sort on documents that have a mileage property

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
const sortedRedCars = await ditto.store.collection('cars')
    .find("color == 'red'")
    .sort('miles', 'ascending')
```

</TabItem>
<TabItem value="swift">

```swift
let sortedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", direction: .ascending)
    .exec()
```

</TabItem>
<TabItem value="objc">

```objc
NSArray *sortedRedCars = [[[[ditto.store collection:@"cars"]
                  find:@"color == 'red'"]
                  sort:@"miles" direction:DITSortDirectionAscending] exec];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
val sortedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", DittoSortDirection.Ascending)
    .exec()
```

</TabItem>
<TabItem value="java">

```java
List<DittoDocument> sortedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", DittoSortDirection.Ascending)
    .exec();
```

</TabItem>
<TabItem value="csharp">

```csharp
var sortedCars = ditto.Store.Collection("cars")
    .Find("color == 'red'")
    .Sort("miles", direction: DittoSortDirection.Ascending)
    .Exec();
```

</TabItem>
<TabItem value="cpp">

```cpp
std::vector<Document> sorted_and_limited_red_cars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", SortDirection::ascending)
    .limit(100)
    .exec();
```

</TabItem>

<TabItem value="rust">

```rust
let results = ditto.store().collection("cars").find("color == \'red\'")
  .sort("miles", SortDirection::Ascending)
  .limit(100)
  .exec()?;
```
</TabItem>
</Tabs>

## Limit 

There are times where you need to limit the number of results that a query. Call `limit` before the query is executed to trim the number of results. This is best used with `sort`.

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
const sortedAndLimitedRedCars = await ditto.store.collection('cars')
    .find("color == 'red'")
    .sort('miles', 'ascending')
    .limit(100)
```

</TabItem>
<TabItem value="swift">

```swift
let sortedAndLimitedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", direction: .ascending)
    .limit(100)
    .exec()
```

</TabItem>
<TabItem value="objc">

```objc
NSArray *sortedAndLimitedRedCars = [[[[[ditto.store collection:@"cars"]
                  find:@"color == 'red'"]
                  sort:@"miles" direction:DITSortDirectionAscending]
                  limit:100] exec];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
val sortedAndLimitedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", DittoSortDirection.Ascending)
    .limit(100)
    .exec()
```

</TabItem>
<TabItem value="java">

```java
List<DittoDocument> sortedAndLimitedRedCars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", DittoSortDirection.Ascending)
    .limit(100)
    .exec();
```

</TabItem>
<TabItem value="csharp">

```csharp
var sortedAndLimitedRedCars = ditto.Store.Collection("cars")
    .Find("color == 'red'")
    .Sort("miles", direction: DittoSortDirection.Ascending)
    .Limit(100).Exec();
```

</TabItem>
<TabItem value="cpp">

```cpp
std::vector<Document> sorted_and_limited_red_cars = ditto.store.collection("cars")
    .find("color == 'red'")
    .sort("miles", SortDirection::ascending)
    .limit(100)
    .exec();
```

</TabItem>
<TabItem value="rust">

```rust
let results = ditto.store().collection("cars").find("color == \'red\'")
  .sort("miles", SortDirection::Ascending)
  .limit(100)
  .exec()?;
```

</TabItem>
</Tabs>
