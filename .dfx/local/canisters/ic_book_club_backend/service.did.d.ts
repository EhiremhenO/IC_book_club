import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Book {
  'title' : string,
  'author' : string,
  'summary' : string,
}
export interface Member {
  'age' : bigint,
  'name' : string,
  'favoriteBook' : string,
}
export interface _SERVICE {
  'addBook' : ActorMethod<[string, string, string, string], undefined>,
  'addMember' : ActorMethod<[string, string, bigint, string], undefined>,
  'filterBooks' : ActorMethod<[string], Array<[string, Book]>>,
  'filterMembers' : ActorMethod<[string], Array<[string, Member]>>,
  'getAllBooks' : ActorMethod<[], Array<[string, Book]>>,
  'getAllMembers' : ActorMethod<[], Array<[string, Member]>>,
  'getBook' : ActorMethod<[string], [] | [Book]>,
  'getBooksCount' : ActorMethod<[], bigint>,
  'getMember' : ActorMethod<[string], [] | [Member]>,
  'getMembersCount' : ActorMethod<[], bigint>,
  'removeBook' : ActorMethod<[string], undefined>,
  'removeMember' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
