# mongoose-shortkey

A simple plugin to allow shorter, indexed IDs for Mongoose documents. Useful for REST APIs, generating sequential numbers, etc...

## Usage ##

Initialise the plugin with the connection to your Mongo database

```
  var mongoose = require('mongoose'),
    shortkey = require('mongoose-shortkey'),
    db = mongoose.createConnection(...);

  shortid.init(db);

```

Then add to a model

```

  var schema = new mongoose.Schema({});
    schema.plugin(shortkey.plugin, { category: 'MyModel' });

```

This will create a field called `sid` on each newly created document that contains it's sequential ID.


## More ##

You can alter the field name, type, and the way the count is serialized through passing in additional options via the plugin call.

```

  var schema = new mongoose.Schema({});
    schema.plugin(shortkey.plugin, { category: 'MyModel', key: 'id', type: Number});

```