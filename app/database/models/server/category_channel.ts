// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Relation} from '@nozbe/watermelondb';
import {field, immutableRelation} from '@nozbe/watermelondb/decorators';
import Model, {Associations} from '@nozbe/watermelondb/Model';

import {MM_TABLES} from '@constants/database';

import type CategoryModel from '@typings/database/models/servers/category';
import type CategoryChannelInterface from '@typings/database/models/servers/category_channel';
import type ChannelModel from '@typings/database/models/servers/channel';
import type UserModel from '@typings/database/models/servers/user';

const {CATEGORY_CHANNEL, CATEGORY, CHANNEL, USER} = MM_TABLES.SERVER;

/**
 * The CategoryChannel model represents the 'association table' where many categories have channels and many channels are in
 * categories (relationship type N:N)
 */
export default class CategoryChannelModel extends Model implements CategoryChannelInterface {
    /** table (name) : CategoryChannel */
    static table = CATEGORY_CHANNEL;

    /** associations : Describes every relationship to this table. */
    static associations: Associations = {

        /** A CategoryChannel belongs to a CATEGORY */
        [CATEGORY]: {type: 'belongs_to', key: 'category_id'},

        /** A CategoryChannel belongs to a USER */
        [USER]: {type: 'belongs_to', key: 'user_id'},

        /** A CategoryChannel has a Channel */
        [CHANNEL]: {type: 'belongs_to', key: 'channel_id'},
    };

    /** category_id : The foreign key to the related Category record */
    @field('category_id') categoryId!: string;

    /** channel_id : The foreign key to the related Channel record */
    @field('channel_id') channelId!: string;

    /* user_id: The foreign key to the related User record */
    @field('user_id') userId!: string;

    /* sort_order: The sort order for the channel in category */
    @field('sort_order') sortOrder!: number;

    /** user: The related user */
    @immutableRelation(USER, 'user_id') user!: Relation<UserModel>;

    /** category : The related category */
    @immutableRelation(CATEGORY, 'category_id') category!: Relation<CategoryModel>;

    /** channel : The related channel */
    @immutableRelation(CHANNEL, 'channel_id') channel!: Relation<ChannelModel>;
}