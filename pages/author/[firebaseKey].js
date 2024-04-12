/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getAuthorDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getAuthorDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.warn(authorDetails.books);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <h5>
            {authorDetails.first_name} {authorDetails.last_name}
            {authorDetails.favorite ? '❤️' : ''}
          </h5>
          Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
          <hr />
        </div>
      </div>
      {authorDetails.books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorDetails} />
      ))}
    </>
  );
}
