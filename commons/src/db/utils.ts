import { model, Model, Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";

// useless
function defineMongoModel<T>(modelName: string, collectionName: string, schemaDefinition: SchemaDefinition<SchemaDefinitionType<T>>): Model<T> {

    const schema = new Schema<T>(schemaDefinition, {
        timestamps: true,
        versionKey: false
    })
    return model<T>(modelName, schema, collectionName);
}

export { defineMongoModel }