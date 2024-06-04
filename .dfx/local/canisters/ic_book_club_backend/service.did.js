export const idlFactory = ({ IDL }) => {
  const Book = IDL.Record({
    'title' : IDL.Text,
    'author' : IDL.Text,
    'summary' : IDL.Text,
  });
  const Member = IDL.Record({
    'age' : IDL.Nat,
    'name' : IDL.Text,
    'favoriteBook' : IDL.Text,
  });
  return IDL.Service({
    'addBook' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'addMember' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat, IDL.Text], [], []),
    'filterBooks' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(IDL.Text, Book))],
        ['query'],
      ),
    'filterMembers' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(IDL.Text, Member))],
        ['query'],
      ),
    'getAllBooks' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Book))],
        ['query'],
      ),
    'getAllMembers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Member))],
        ['query'],
      ),
    'getBook' : IDL.Func([IDL.Text], [IDL.Opt(Book)], ['query']),
    'getBooksCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getMember' : IDL.Func([IDL.Text], [IDL.Opt(Member)], ['query']),
    'getMembersCount' : IDL.Func([], [IDL.Nat], ['query']),
    'removeBook' : IDL.Func([IDL.Text], [], []),
    'removeMember' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
