import type { Db, Document, MongoServerError } from "mongodb";

const applySchemaValidation = async (db: Db, schema: Document, collection: string) => {
    await db.command({
        collMod: collection,
        validator: schema,
    }).catch( async (error: MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound'){
            await db.createCollection(collection, {validator: schema});
        }
    })
};

export default applySchemaValidation;