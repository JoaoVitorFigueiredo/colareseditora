from flask import jsonify, request, abort
from app import app, books_collection

@app.route("/api/v1/allbooks", methods=["GET"])
def get_books():
    # Todos os livros da coleção
    books = list(books_collection.find({}))

    # Converter os objetos BSON para JSON
    for book in books:
        book["_id"] = str(book["_id"])  # Converter o ObjectId para uma string para JSON

    # Formato JSON
    return jsonify(books)  # Lista de livros como resposta JSON

# Definição da rota para listar os livros com paginação
@app.route("/api/v1/books", methods=["GET"])
def list_books():

    # Obter parâmetros de consulta para paginação
    # Default page = 1 e limit = 10 (pesquisa sem parâmetros de consulta)
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    # Calcular o índice de início e fim para a paginação
    start_index = (page - 1) * limit

    # Livros com base no .skip (para pular) e .limit (para limitar) a quantidade de livros
    books = list(books_collection.find({}).skip(start_index).limit(limit))

    for book in books:
        book["_id"] = str(book["_id"])  

    return jsonify(books)

# Definição da rota para procurar os livros pelo ID (inteiro)
@app.route("/api/v1/books/<string:id>", methods=["GET"])
def get_book_by_id(id):

    # Procurar o livro pelo campo 'id'
    book = books_collection.find_one({"id": id})

    if book:

        book["_id"] = str(book["_id"])  
        return jsonify(book)  
    
    else:
        abort(404)
