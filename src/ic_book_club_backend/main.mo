import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor BookClub {

    // Define types for Book and Member
    public type Book = {
        title: Text;
        author: Text;
        summary: Text;
    };

    public type Member = {
        name: Text;
        age: Nat;
        favoriteBook: Text;
    };

    // Stable variable to back up book and member data
    stable var bookBackup: [(Text, Book)] = [];
    stable var memberBackup: [(Text, Member)] = [];

    // TrieMap to store books and members
    var bookStore = TrieMap.fromEntries<Text, Book>(bookBackup.vals(), Text.equal, Text.hash);
    var memberStore = TrieMap.fromEntries<Text, Member>(memberBackup.vals(), Text.equal, Text.hash);

    // Functions to manage books
    public func addBook(key: Text, title: Text, author: Text, summary: Text): async () {
        bookStore.put(key, { title = title; author = author; summary = summary });
    };

    public query func getBook(key: Text): async ?Book {
        bookStore.get(key);
    };

    public func removeBook(key: Text): async () {
        bookStore.delete(key);
    };

    public query func getAllBooks(): async [(Text, Book)] {
        Iter.toArray(bookStore.entries());
    };

    public query func getBooksCount(): async Nat {
        bookStore.size();
    };

    public query func filterBooks(filter: Text): async [(Text, Book)] {
        Iter.toArray(
            TrieMap.mapFilter<Text, Book, Book>(
                bookStore,
                Text.equal,
                Text.hash,
                func(k, v) {
                    if (Text.contains(v.title, #text filter) or Text.contains(v.author, #text filter)) {
                        ?v
                    } else {
                        null
                    }
                }
            ).entries()
        );
    };

    // Functions to manage members
    public func addMember(key: Text, name: Text, age: Nat, favoriteBook: Text): async () {
        memberStore.put(key, { name = name; age = age; favoriteBook = favoriteBook });
    };

    public query func getMember(key: Text): async ?Member {
        memberStore.get(key);
    };

    public func removeMember(key: Text): async () {
        memberStore.delete(key);
    };

    public query func getAllMembers(): async [(Text, Member)] {
        Iter.toArray(memberStore.entries());
    };

    public query func getMembersCount(): async Nat {
        memberStore.size();
    };

    public query func filterMembers(filter: Text): async [(Text, Member)] {
        Iter.toArray(
            TrieMap.mapFilter<Text, Member, Member>(
                memberStore,
                Text.equal,
                Text.hash,
                func(k, v) {
                    if (Text.contains(v.name, #text filter) or Text.contains(v.favoriteBook, #text filter)) {
                        ?v
                    } else {
                        null
                    }
                }
            ).entries()
        );
    };

    // Pre and post upgrade hooks
    system func preupgrade() {
        bookBackup := Iter.toArray(bookStore.entries());
        memberBackup := Iter.toArray(memberStore.entries());
    };

    system func postupgrade() {
        bookBackup := [];
        memberBackup := [];
    }
};