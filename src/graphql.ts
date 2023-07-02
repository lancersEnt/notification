
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateNotificationInput {
    title: string;
    body: string;
    targetUserId: string;
    createdBy: string;
    status?: Nullable<string>;
    seen: boolean;
    createdAt?: Nullable<DateTime>;
}

export class UpdateNotificationInput {
    title?: Nullable<string>;
    body?: Nullable<string>;
    targetUserId?: Nullable<string>;
    createdBy?: Nullable<string>;
    status?: Nullable<string>;
    seen?: Nullable<boolean>;
    updatedAt?: Nullable<DateTime>;
}

export class Notification {
    id: string;
    title: string;
    body: string;
    targetUserId: string;
    createdBy: string;
    status: string;
    seen: boolean;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract notifications(): Nullable<Notification>[] | Promise<Nullable<Notification>[]>;

    abstract notification(id: string): Nullable<Notification> | Promise<Nullable<Notification>>;
}

export abstract class IMutation {
    abstract createNotification(createNotificationInput: CreateNotificationInput): Notification | Promise<Notification>;

    abstract updateNotification(id: string, updateNotificationInput: UpdateNotificationInput): Notification | Promise<Notification>;

    abstract removeNotification(id: string): Nullable<Notification> | Promise<Nullable<Notification>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
