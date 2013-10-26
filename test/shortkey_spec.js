var mongoose = require('mongoose'),
    should = require('chai').should(),
    shortkey = require('..');
    
describe('Mongoose ShortKey', function(){
    
    var db;

    before(function(done) {
        db = mongoose.createConnection('127.0.0.1', 'shortkey_test');
        shortkey.init(db);
        return done();
    });

    it('should be able to save a short ID', function(done) {

        var schema = new mongoose.Schema({});
        schema.plugin(shortkey.plugin, { category: 'TestDocument' });

        var TestDocument = db.model('TestDocuments', schema),
            newDoc = new TestDocument({});

        newDoc.save(function(err, saved) {
            if (err) return done(err);
            if (!saved.sid) return done('No short ID saved');
            var id = saved.sid;

            newDoc.save(function(err, saved) {
                id.should.equal(saved.sid);
                return done(err);
            });
        });
        
    });

    it('should be able to save a custom short ID', function(done) {

        var schema = new mongoose.Schema({});
        schema.plugin(shortkey.plugin, { category: 'CustomDocument', serializer: function(counter, doc) { return 'custom-' + counter; } });

        var CustomDocument = db.model('CustomDocuments', schema),
            newDoc = new CustomDocument({});

        newDoc.save(function(err, saved) {
            if (err) return done(err);
            if (!saved.sid) return done('No short ID saved');

            if (saved.sid.indexOf('custom-') == -1) return callback('Custom short ID failed');
            return done();
        });
    });

    it('should be able to save a short ID with custom type', function(done) {

        var schema = new mongoose.Schema({});
        schema.plugin(shortkey.plugin, { category: 'CustomKeyTypeDocuments', type: Number });

        var CustomKeyTypeDocument = db.model('CustomKeyTypeDocuments', schema),
            newDoc = new CustomKeyTypeDocument({});

        newDoc.save(function(err, saved) {
            if (err) return done(err);
            console.log(saved.sid);
            if (saved.sid === undefined) return done('No short ID saved');

            saved.sid.should.be.a("Number");

            return done();
        });
    });
    
});