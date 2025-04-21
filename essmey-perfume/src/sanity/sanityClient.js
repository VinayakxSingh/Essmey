import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "g7s2wujj",
  dataset: "production",
  useCdn: false,
  token:
    "skYRE5DzOsL8WbKCiqIEKRboCTbaMFYj4MdjDDon4tJ7Q8M9mkfI8u7xM3ajMVDrd6PGSyn9Mo4ahEXZqB0qv9UqWGQ7CXubBUhdeOZg9j5lkAHRWUCbDQqlfRElGwbpgBglUl3BNvjHkTyC6N4pkkfUsU2VYWAk8fHqFhAEaxe8eYjv97z8",
  apiVersion: "2023-12-01",
});
