import React from 'react'

//@ts-ignore
const BookPage = async ({params}) =>  {
    const {book} = await params
    console.log(book);
    
  return (
    <div>BookPage{book?.join(",")}</div>
  )
}

export default BookPage