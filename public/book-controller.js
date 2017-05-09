function BookController(){
  var bookService = new BookService()

this.createBook = function createBook(event){//in submit fx, the first param will be event
event.preventDefault() //keeps page from reloading
var book = {
title: event.target.title.value,
author: event.target.author.value,
published: event.target.published.value,
rating: event.target.rating.value
}

bookService.createBook(book)

}



}