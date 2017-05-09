function BookService(){
var url = "http://localhost:4545/books"
this.createBook = function(book){
  $.post(url, book).then(function(res){
    console.log(res)
  })
}





}