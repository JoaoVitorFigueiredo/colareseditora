from flask import jsonify, request, abort
from app import app, books_collection , token_required
from datetime import datetime

@app.route("/api/v1/allbooks", methods=["GET"])
def get_books():
    # Todos os livros da coleção
    books = list(books_collection.find({}))

    # Converter os objetos BSON para JSON
    for book in books:
        book["_id"] = str(book["_id"])  # Converter o ObjectId para uma string para JSON

    # Formato JSON
    return jsonify(books), 200  # Lista de livros como resposta JSON

# Definição da rota para procurar os livros pelo ID (inteiro)
@app.route("/api/v1/books/<string:id>", methods=["GET"])
def get_book_by_id(id):
    # Procurar o livro pelo campo 'id'
    book = books_collection.find_one({"id": id})

    if book:

        book["_id"] = str(book["_id"])
        return jsonify(book), 200

    else:
        return jsonify({"message": "Error", "status": "Book not found"}), 404


@app.route("/api/v1/books/featured", methods=["GET"])
def get_featured_books():
    # 5 livros com o maior score (decrescente, por isso -1), ordenados por preço (crescente, por isso 1)
    featured_books = list(books_collection.find().sort([("score", -1), ("price", 1)]).limit(5))

    for book in featured_books:
        book["_id"] = str(book["_id"])

    return jsonify(featured_books), 200


@app.route("/api/v1/books/total", methods=["GET"])
def get_total_books():
    # Número total de livros na coleção
    total_books = books_collection.count_documents({})

    return jsonify({"total_books": total_books}), 200

# Rota para apagar um livro pelo ID respetivo
# Necessário autenticação @token_required
@app.route("/api/v1/books/<string:id>", methods=["DELETE"])
@token_required
def delete_book_by_id(id):

    result = books_collection.delete_one({"id": id})

    if result.deleted_count == 0:
        return jsonify({"message": "Error", "status": "Book not found"}), 404

    return jsonify({"message": "Success", "status": "Book deleted"}), 200

def paginate(query, page, limit):
    results = query.skip((page - 1) * limit).limit(limit)
    return list(results)

# Definição da rota para listar os livros com paginação
@app.route("/api/v1/books", methods=["GET"])
def list_books():
    # Obter parâmetros de consulta para paginação
    # Default page = 1 e limit = 10 (pesquisa sem parâmetros de consulta)
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = books_collection.find({})

    # Livros com base no .skip (para pular) e .limit (para limitar) a quantidade de livros
    books = paginate(query, page, limit)

    for book in books:
        book["_id"] = str(book["_id"])

    return jsonify(books), 200

@app.route("/api/v1/books/author/<author>", methods=["GET"])
def get_books_by_author(author):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = books_collection.find({"authors": author})
    
    books = paginate(query, page, limit)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    return jsonify(books), 200

@app.route("/api/v1/books/title/<title>", methods=["GET"])
def get_books_by_title(title):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = books_collection.find({"title": author})
    
    books = paginate(query, page, limit)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    return jsonify(books), 200

@app.route("/api/v1/books/year/<int:year>", methods=["GET"])
def get_books_by_year(year):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    start_date = datetime(year, 1, 1)
    end_date = datetime(year + 1, 1, 1)

    query = books_collection.find({
        "publishedDate": {
            "$gte": start_date,
            "$lt": end_date
        }
    })
    
    books = paginate(query, page, limit)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    return jsonify(books), 200

@app.route("/api/v1/books/categories/<categories>", methods=["GET"])
def get_books_by_category(categories):

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = books_collection.find({"categories": categories})
    
    books = paginate(query, page, limit)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    return jsonify(books), 200

@app.route("/api/v1/books/price", methods=["GET"])
def get_books_by_price():

    min_price = float(request.args.get("min_price", 0))

    # Float inf para o caso de não ser passado um valor máximo
    # Significa o infinito positivo em float (sem limite superior)
    max_price = float(request.args.get("max_price", float("inf")))

    order = request.args.get("order", "asc")

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    
    # Default order é ascendente (1)
    # Descendente (-1) para o caso de ser passado "desc" ou outro valor
    sort_order = 1 if order == "asc" else -1

    query = books_collection.find({
        "price": {"$gte": min_price, "$lte": max_price}
    }).sort("price", sort_order)
    
    books = paginate(query, page, limit)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    return jsonify(books), 200
