import { Users, usersAssociate } from './users.model.js';
import { Collections, collectionAssociate } from './collections.model.js';
import { Items, itemsAssociate } from './items.model.js';
import { Comments, commentsAssociate } from './comments.model.js';
import {
  OptionalFieldType,
  optionalFieldTypeAssociate,
} from './optionalFieldType.js';
import {
  OptionalFieldValue,
  optionalFieldValueAssociate,
} from './optionalFieldValue.js';
import { Likes, likesAssociate } from './likes.model.js';
import { Types } from './types.model.js';
import { Themes } from './themes.model.js';

export const loadModels = () => {
  const models = {
    users: Users,
    collections: Collections,
    items: Items,
    comments: Comments,
    optionalFieldType: OptionalFieldType,
    optionalFieldValue: OptionalFieldValue,
    likes: Likes,
    types: Types,
    themes: Themes,
  };
  usersAssociate(models);
  collectionAssociate(models);
  itemsAssociate(models);
  commentsAssociate(models);
  optionalFieldTypeAssociate(models);
  optionalFieldValueAssociate(models);
  likesAssociate(models);
};
